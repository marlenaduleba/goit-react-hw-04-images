import { ThreeDots } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <ThreeDots
      height="100"
      width="100"
      radius="9"
      color="#757575"
      ariaLabel="three-dots-loading"
      wrapperStyle={{ margin: 'auto' }}
      wrapperClassName=""
      visible={true}
    />
  );
};