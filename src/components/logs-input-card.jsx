import { analyzeLogs } from '@/api/analyzeLogs';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Atom, ListRestart } from 'lucide-react';
import { useState } from 'react';
import { BarLoader } from 'react-spinners';
import { toast } from 'sonner';
import { Button } from './ui/button';

const LogsInputCard = ({ updateAnomalies }) => {
  // log input expected as list of strings
  const [logInput, setLogInput] = useState(null);
  const [inputError, setInputError] = useState(null);
  const [isAnalyzingLogs, setIsAnalyzingLogs] = useState(false);

  const handleInputChange = (e) => {
    e.preventDefault();
    setInputError(null);

    setLogInput(e.target.value);
  };

  const handleSubmit = async () => {
    // reset anomalies view
    updateAnomalies(null);

    try {
      // If no logs keyed in by user
      if (logInput === null || logInput?.length === 0) {
        setInputError('Please enter logs');
        return;
      }

      let logsList = [];

      // if already entered in array format
      if (Array.isArray(logInput)) {
        logsList = logInput.map((log) => log.trim());
      }

      // If entered as strings separated by comma
      logsList = logInput.split(',').map((log) => log.trim());

      // Logs should be an array
      if (!Array.isArray(logsList)) {
        throw new Error('Logs should be passed in an array format');
      }

      // enable loader
      setIsAnalyzingLogs(true);

      // pass logs to api to analyze
      const anomaliesData = await analyzeLogs(logsList);
      setIsAnalyzingLogs(false);

      // update parent
      updateAnomalies(anomaliesData);

      toast.success('Logs analyzed successfully');
    } catch (error) {
      console.error(error);
      setInputError('Something went wrong, please check your logs.');
      toast.error('Something went wrong, please check your logs.');
      updateAnomalies(null);
      setIsAnalyzingLogs(false);
    }
  };

  const handleReset = () => {
    setInputError(null);
    setLogInput(null);
    setIsAnalyzingLogs(false);
    updateAnomalies(null);
  };

  return (
    <div>
      <Card className='p-6'>
        <CardHeader>
          <CardTitle className='text-xl text-muted-foreground'>
            Logs Input
          </CardTitle>
          <CardDescription>
            Please input your list of logs in the textarea below:
          </CardDescription>
          <CardAction className={'flex gap-2'}>
            <Button
              variant='outline'
              className='text-teal-600 hover:text-teal-700 cursor-pointer'
              onClick={() => window.open('http://13.203.97.225:8501', '_blank')}
              disabled={isAnalyzingLogs}
            >
              Interactive Log Analysis
            </Button>
            <Button
              variant='outline'
              className='text-teal-600 hover:text-teal-700 cursor-pointer'
              onClick={handleReset}
              disabled={isAnalyzingLogs}
            >
              <ListRestart className='h-4 w-4' />
              Reset
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder='Type your logs here...'
            onChange={(e) => handleInputChange(e)}
            value={logInput || ''}
            name='log_input'
            disabled={isAnalyzingLogs}
            required
          />
          {inputError && <p className='text-red-500 text-sm'>{inputError}</p>}
        </CardContent>
        <CardFooter className='flex items-end gap-1'>
          <Button
            className='bg-teal-600 cursor-pointer hover:bg-teal-700'
            onClick={handleSubmit}
            disabled={isAnalyzingLogs}
          >
            <Atom
              className={`h-4 w-4 ${isAnalyzingLogs ? 'animate-spin' : ''}`}
            />
            {isAnalyzingLogs ? 'Analyzing Logs' : 'Analyze Logs'}
          </Button>
          {isAnalyzingLogs && <BarLoader color='#36b9d6b3' width={'100%'} />}
        </CardFooter>
      </Card>
    </div>
  );
};

export default LogsInputCard;
