'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GrUpdate } from "react-icons/gr";

import StatsContainer from './components/statsPage/statsContainer';
import { useAppDispatch, useAppSelector } from '../redux/slices/statsSlice';
import { fetchGetStats } from '@/redux/slices/statsSlice';
import { fetchCard } from '@/redux/slices/cardsSlice';
import { selectIsAuth } from '@/redux/slices/authSlice';

const StatsPage = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const statsData = useAppSelector((state) => state.stats.data);
  const [loading, setLoading] = useState(true);
  const [currentCard, setCurrentCard] = useState(null);
  const [statsUser, setStatsUser] = useState(null);

  useEffect(() => {
    if (!isAuth) {
      router.push('/login');
    } else {
      fetchCardFunc();
      fetchData();
    }
  }, [isAuth]);

  const fetchCardFunc = async () => {
    if (isAuth) {
      const result = await dispatch(fetchCard());
      setCurrentCard(result.payload?.data ?? null);
    } else {
      setCurrentCard(null);
    }
  };

  const fetchData = async () => {
    if (isAuth) {
      const result = await dispatch(fetchGetStats());
      setStatsUser(result.payload?.userData ?? null);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center w-screen h-screen'>
        <p className="text-black text-lg font-medium">Loading...</p>
      </div>
    );
  }

  return (
    statsData && (
      <>
        <div
          onClick={() => {
            fetchCardFunc();
            fetchData();
          }}
          className="flex justify-center cursor-pointer items-center rounded-full w-16 h-16 bg-violet-500 fixed mr-12 mb-12 bottom-0 right-0"
        >
          <GrUpdate size="30px" color="white" />
        </div>
        <StatsContainer data={statsUser} card={currentCard} />
      </>
    )
  );
};

export default StatsPage;
