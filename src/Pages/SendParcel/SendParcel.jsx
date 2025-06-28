import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useLoaderData } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const SendParcel = () => {
  const warehouses = useLoaderData();
  const { user } = useAuth(); // 🔥 Get current logged-in user

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset
  } = useForm();

  const axiosSecure = useAxiosSecure();

  const [cost, setCost] = useState(0);
  const [dataToSubmit, setDataToSubmit] = useState(null);

  const parcelType = watch('parcelType');
  const senderDistrict = watch('senderDistrict');
  const receiverDistrict = watch('receiverDistrict');
  const weight = watch('weight');
  const isNonDocument = parcelType === 'non-document';

  useEffect(() => setValue('senderServiceCenter', ''), [senderDistrict, setValue]);
  useEffect(() => setValue('receiverServiceCenter', ''), [receiverDistrict, setValue]);

  const senderCenters = warehouses.filter(w => w.district === senderDistrict);
  const receiverCenters = warehouses.filter(w => w.district === receiverDistrict);

  const calculateCost = (type, senderDistrict, receiverDistrict, weight) => {
    const isSameDistrict = senderDistrict === receiverDistrict;
    const w = parseFloat(weight) || 0;
    let breakdown = '';
    let total = 0;

    if (type === 'document') {
      total = isSameDistrict ? 60 : 80;
      breakdown = `Base Rate (Document): ৳${total}`;
    } else {
      if (w <= 3) {
        total = isSameDistrict ? 110 : 150;
        breakdown = `Base Rate (Non-Document ≤ 3kg): ৳${total}`;
      } else {
        const base = isSameDistrict ? 110 : 150;
        const extra = (w - 3) * 40;
        const interDistrictFee = isSameDistrict ? 0 : 40;
        total = base + extra + interDistrictFee;
        breakdown = `Base Rate (3kg): ৳${base}<br>Extra Weight (${(w - 3).toFixed(1)}kg × ৳40): ৳${extra}<br>${isSameDistrict ? '' : 'Inter-District Fee: ৳40<br>'
          }`;
      }
    }

    return { total, breakdown };
  };

  const onSubmit = async (data) => {
    console.log("Form submitted!", data);
    const { total, breakdown } = calculateCost(data.parcelType, data.senderDistrict, data.receiverDistrict, data.weight);
    setCost(total);
    setDataToSubmit(data);

    const { isConfirmed } = await Swal.fire({
      icon: 'info',
      title: 'Price Breakdown',
      html: `
      <div style="text-align: left">
        ${breakdown}
        <hr style="margin: 10px 0;" />
        <strong style="font-size: 18px;">Total Cost: ৳${total}</strong>
      </div>
    `,
      showCancelButton: true,
      confirmButtonText: 'Proceed to Payment',
      cancelButtonText: 'Edit Info',
      focusCancel: true,
      confirmButtonColor: '#22c55e',
      cancelButtonColor: '#f59e0b'
    });

    if (isConfirmed) {
      const parcelData = {
        ...data,
        userEmail: user?.email,
        userName: user?.displayName || 'Anonymous',
        creation_date: new Date().toISOString(),
        delivery_cost: total,
        status: 'pending',
        paymentStatus: 'unpaid',
        trackingId: `parcel_${Math.random().toString(36).substring(2, 9)}`
      };

      console.log('Data to Send:', parcelData);

      // ✅ Backend POST request (uncomment when server is ready)
      // try {
      //   const res = await fetch('http://localhost:5000/api/parcel', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(parcelData)
      //   });

      //   const result = await res.json();
      //   if (result.insertedId) {
      //     // ✅ Form reset
      //     reset();

      //     // ✅ Final confirmation alert
      //     await Swal.fire({
      //       icon: 'success',
      //       title: 'Parcel saved successfully!',
      //       text: 'Your parcel has been submitted and is now pending for payment.',
      //       confirmButtonColor: '#22c55e'
      //     });
      //   } else {
      //     Swal.fire('Error', 'Failed to save parcel!', 'error');
      //   }
      // } catch (err) {
      //   Swal.fire('Error', 'Server error occurred!', 'error');
      //   console.error(err);
      // }

      axiosSecure.post('/api/parcel', parcelData)
        .then(res => {
          if (res.data.insertedId) {
            // redirect to the payment page
            reset();
            Swal.fire({
              icon: 'success',
              title: 'Parcel saved successfully!',
              text: 'Your parcel has been submitted and is now pending for payment.',
              confirmButtonColor: '#22c55e'
            });
          } else {
            Swal.fire('Error', 'Failed to save parcel!', 'error');
          }
        })
        .catch(err => {
          console.error('Axios error:', err);
          //  console.error('Axios error:', err.response || err.message || err);
          Swal.fire('Error', 'Server error occurred!', 'error');
        });



      // 🧪 Temporary fake success for demo (remove this block when backend ready)
      // reset();
      // await Swal.fire({
      //   icon: 'success',
      //   title: 'Parcel saved successfully!',
      //   text: 'Your parcel has been submitted and is now pending for payment.',
      //   confirmButtonColor: '#22c55e'
      // });
    }
  };


  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold text-center">Send Your Parcel</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <fieldset className="border rounded-xl p-4">
          <legend className="font-semibold">Parcel Info</legend>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <span className="label">Type</span>
              <div className="flex gap-4 mt-1">
                <label className="flex items-center gap-2">
                  <input type="radio" value="document" {...register('parcelType', { required: true })} className="radio" />
                  Document
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" value="non-document" {...register('parcelType', { required: true })} className="radio" />
                  Non‑Document
                </label>
              </div>
              {errors.parcelType && <span className="text-red-500">Required</span>}
            </div>

            <div>
              <label className="label">Title</label>
              <input {...register('title', { required: true })} className="input input-bordered w-full" />
              {errors.title && <span className="text-red-500">Required</span>}
            </div>

            {isNonDocument && (
              <div>
                <label className="label">Weight (kg)</label>
                <input type="number" step="0.1" {...register('weight')} className="input input-bordered w-full" />
              </div>
            )}
          </div>
        </fieldset>

        <div className="md:flex md:gap-6">
          <fieldset className="border rounded-xl p-4 md:w-1/2 mb-6 md:mb-0">
            <legend className="font-semibold">Sender Info</legend>
            <div className="grid gap-4 mt-4">
              <input {...register('senderName', { required: true })} defaultValue={user?.displayName || 'Shihab'} hidden />
              <Field label="Contact" name="senderContact" register={register} required errors={errors} />
              <FieldSelect label="District" name="senderDistrict" options={[...new Set(warehouses.map(w => w.district))]} register={register} required errors={errors} />
              <Field label="Address" name="senderAddress" register={register} required errors={errors} />
              <Field label="Pickup Instruction" name="pickupInstruction" register={register} required errors={errors} />
            </div>
          </fieldset>

          <fieldset className="border rounded-xl p-4 md:w-1/2">
            <legend className="font-semibold">Receiver Info</legend>
            <div className="grid gap-4 mt-4">
              <Field label="Name" name="receiverName" register={register} required errors={errors} />
              <Field label="Contact" name="receiverContact" register={register} required errors={errors} />
              <FieldSelect label="District" name="receiverDistrict" options={[...new Set(warehouses.map(w => w.district))]} register={register} required errors={errors} />
              <Field label="Address" name="receiverAddress" register={register} required errors={errors} />
              <Field label="Delivery Instruction" name="deliveryInstruction" register={register} required errors={errors} />
            </div>
          </fieldset>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

// 🔄 Reusable input component
const Field = ({ label, name, register, required, errors }) => (
  <div>
    <label className="label">{label}</label>
    <input {...register(name, { required })} className="input input-bordered w-full" />
    {errors[name] && <span className="text-red-500">Required</span>}
  </div>
);

// 🔄 Reusable select dropdown
const FieldSelect = ({ label, name, options, register, required, errors }) => (
  <div>
    <label className="label">{label}</label>
    <select {...register(name, { required })} className="select select-bordered w-full">
      <option value="">Select {label}</option>
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
    {errors[name] && <span className="text-red-500">Required</span>}
  </div>
);

export default SendParcel;