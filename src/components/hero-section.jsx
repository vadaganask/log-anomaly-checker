import { Suspense } from 'react';
import { BarLoader } from 'react-spinners';
import AnomalyCard from './anomaly-card';
import LogsInputCard from './logs-input-card';
import { useState } from 'react';

const HeroSection = () => {
  const [anomaliesData, setAnomaliesData] = useState(null);
  return (
    <main className='min-h-screen'>
      <div className='m-4 p-8'>
        {/* Log Inputs Form */}
        <LogsInputCard updateAnomalies={setAnomaliesData} />

        {/* Analyzed response Card */}
        <Suspense
          fallback={
            <BarLoader className='mt-4' color='#36b9d6b3' width={'100%'} />
          }
        >
          {anomaliesData && <AnomalyCard anomaliesData={anomaliesData} />}
        </Suspense>
      </div>
    </main>
  );
};

export default HeroSection;
