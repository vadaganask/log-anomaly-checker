export async function analyzeLogs(logs) {
  const url = 'http://18.212.164.88:8001/predict-sequence/';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_sequence: logs,
        description:
          'Real log sequence from nova-sample.log showing instance lifecycle',
        input_type: 'raw_logs',
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
