import { Card, CardContent } from '@/components/ui/card';

const AnomalyCard = ({ anomaliesData }) => {
  return (
    <div className='mt-4'>
      <h2 className='text-4xl font-extrabold tracking-tighter my-8 mx-auto text-center bg-gradient-to-br from-[#40E0D0] to-[#008080] text-transparent bg-clip-text'>
        Details of anomalies found in your logs:
      </h2>

      <Card>
        <CardContent>
          <div className='flex items-baseline justify-between mx-auto p-4 md:p-8'>
            <div className='text-center w-1/2'>
              <div className='text-gray-600 text-xl font-bold py-1'>
                Confidence Score
              </div>
              <div className='text-2xl mb-2 font-extrabold tracking-tighter mx-auto text-center bg-gradient-to-br from-[#40E0D0] to-[#008080] text-transparent bg-clip-text'>
                {anomaliesData?.confidence}
              </div>
            </div>
            <div className='text-center w-1/2'>
              <div className='text-gray-600 text-xl font-bold py-1'>
                Anomalies Present
              </div>
              <div className='text-2xl mb-2 font-extrabold tracking-tighter mx-auto text-center bg-gradient-to-br from-[#40E0D0] to-[#008080] text-transparent bg-clip-text'>
                {anomaliesData?.is_anomaly ? 'Yes' : 'No'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnomalyCard;
