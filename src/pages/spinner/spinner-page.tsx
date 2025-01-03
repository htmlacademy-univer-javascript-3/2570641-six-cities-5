import { SPINNER_GIF_URL } from '@/const';

export default function SpinnerPage(): JSX.Element {
  return (
    <img style={{ textAlign: 'center', width: '100%', height: '100%' }} src={SPINNER_GIF_URL} alt="loading..." />
  );
}
