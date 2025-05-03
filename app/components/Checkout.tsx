'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { clearAll } from '@/store/BasketSlice';
export default function CheckoutPage() {
  const  cartItems  = useSelector((state:any)=>state.basket.basket);
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
    const dispatch=useDispatch()
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/submit-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer: customerInfo,
          items: cartItems,
        }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='bg-amber-50   shadow-2xl rounded-md p-5 w-3/4'>
      <h1 className='text-2xl font-bold text-center'>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='text-xl font-bold'>Name:</label>
          <input className='w-full p-2 rounded-md border-none outline-none '
          style={{boxShadow: "inset 20px 20px 10px 20px white"}}
            type="text" 
            value={customerInfo.name}
            onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
            required
          />
        </div>
        <div>
          <label className='text-xl font-bold'>Email:</label>
          <input className='w-full p-2 rounded-md border-none outline-none '
            style={{boxShadow: "inset 20px 20px 10px 20px white"}}
            type="email" 
            value={customerInfo.email}
            onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
            required
          />
        </div>
        <div>
          <label className='text-xl font-bold'>Phone:</label>
          <input className='w-full p-2 rounded-md border-none outline-none '
            style={{boxShadow: "inset 20px 20px 10px 20px white"}}
            type="tel" 
            value={customerInfo.phone}
            onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
            required
          />
        </div>
        
        <h2 className='text-xl font-bold'>Order Summary</h2>
        <ul className='my-2.5'>
          {cartItems.map((item:any) => (
            <li key={item.id} className='my-1'>{item.name} - {item.salary}</li>
          ))}
        </ul>
        
        <button type="submit" disabled={isSubmitting || cartItems.length === 0} className='bg-black text-amber-50 py-2 px-12 rounded-md border-none outline-none cursor-pointer '
        onClick={()=>dispatch(clearAll())}>
          {isSubmitting ? 'Submitting...' : 'Submit Order'}
        </button>
      </form>
    </div>
  );
}