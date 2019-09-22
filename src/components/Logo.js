import React from 'react';
import PropTypes from 'prop-types';

import SvgIcon from '@material-ui/core/SvgIcon';

const Logo = ({className, ...props}) => {
  return (
    <SvgIcon
      viewBox="0 0 130 32"
      className={className}
      {...props}
    >
      <path d="M15.367 21.214h-10.104v10.458h-5.262v-25.581h16.633v4.263h-11.371v6.614h10.104zM29.137 22.298h-4.166v9.373h-5.287v-25.581h9.489c0.057-0.001 0.124-0.001 0.191-0.001 1.342 0 2.642 0.183 3.875 0.525 1.035 0.285 2.026 0.792 2.882 1.463 0.776 0.632 1.407 1.449 1.823 2.382 0.429 0.977 0.669 2.068 0.669 3.215 0 0.053-0.001 0.106-0.002 0.159 0.001 0.026 0.001 0.067 0.001 0.107 0 0.854-0.116 1.68-0.333 2.465-0.384 1.37-1.217 2.573-2.332 3.426-0.564 0.434-1.187 0.808-1.851 1.108l5.489 10.463v0.268h-5.658zM24.947 18.034h4.263c0.032 0.001 0.069 0.001 0.107 0.001 0.615 0 1.207-0.101 1.759-0.286 0.445-0.164 0.859-0.425 1.205-0.757 0.339-0.332 0.605-0.739 0.771-1.195 0.173-0.465 0.27-0.976 0.27-1.509 0-0.023-0-0.047-0.001-0.070 0.004-0.062 0.006-0.139 0.006-0.216 0-1.015-0.392-1.938-1.032-2.627q-0.997-1.021-3.122-1.021h-4.203zM61.947 6.091v16.877c0.001 0.057 0.002 0.123 0.002 0.19 0 1.34-0.272 2.616-0.763 3.777-0.457 1.054-1.147 1.999-2.002 2.762-0.875 0.759-1.907 1.347-3.041 1.708-1.238 0.384-2.591 0.596-3.993 0.596s-2.755-0.212-4.028-0.605c-1.098-0.351-2.131-0.939-3.008-1.701-0.853-0.758-1.541-1.704-1.998-2.772-0.483-1.15-0.752-2.427-0.752-3.768 0-0.066 0.001-0.132 0.002-0.197l-0-16.867h5.262v16.877q0 2.509 1.218 3.654c0.809 0.719 1.882 1.159 3.057 1.159 0.095 0 0.188-0.003 0.282-0.008 0.071 0.006 0.17 0.009 0.269 0.009 1.171 0 2.239-0.44 3.048-1.164q1.177-1.147 1.177-3.651v-16.877zM75.7 25.319l5.792-19.228h5.859l-8.898 25.581h-5.482l-8.868-25.581h5.841zM105.124 20.58h-10.11v6.828h11.858v4.263h-17.121v-25.581h17.090v4.263h-11.828v6.091h10.11zM119.418 22.298h-4.19v9.373h-5.262v-25.581h9.489c0.057-0.001 0.124-0.001 0.191-0.001 1.343 0 2.642 0.183 3.876 0.525 1.035 0.285 2.026 0.792 2.882 1.463 0.776 0.633 1.407 1.449 1.823 2.382 0.429 0.977 0.67 2.068 0.67 3.215 0 0.055-0.001 0.11-0.002 0.165 0.001 0.026 0.001 0.066 0.001 0.107 0 0.854-0.116 1.68-0.333 2.465-0.38 1.369-1.209 2.571-2.32 3.426-0.564 0.433-1.187 0.808-1.85 1.108l5.465 10.463v0.262h-5.652zM115.228 18.034h4.263c0.032 0.001 0.070 0.001 0.108 0.001 0.615 0 1.206-0.101 1.759-0.286 0.466-0.159 0.899-0.423 1.26-0.764 0.338-0.332 0.604-0.739 0.771-1.194 0.173-0.465 0.27-0.976 0.27-1.509 0-0.023-0-0.047-0.001-0.070 0.004-0.061 0.006-0.136 0.006-0.212 0-1.017-0.394-1.942-1.037-2.631q-1.021-1.033-3.147-1.033h-4.227zM70.888 3.935c0.323 0.67 0.81 0.652 1.456 0.365 0.301-0.123 0.65-0.194 1.016-0.194 0.966 0 1.817 0.497 2.31 1.249-0.225-1.287-0.645-2.59-2.235-2.876-2.059-0.378-2.783 0.908-2.546 1.456zM80.566 4.215c-0.652 0.609-1.693 0-2.759 0-0.992 0.008-1.804 0.766-1.9 1.734-0.001 0.099-0.208 0.111-0.232 0.008 0.082-1.697 1.259-3.097 2.836-3.514 2.548-0.615 2.384 1.474 2.055 1.772zM72.971 0.439c-0.347 0.133-0.589 0.463-0.589 0.85 0 0.293 0.139 0.554 0.355 0.72 0.489 0.452 1.768 0.002 2.804 2.060-0.018-1.437-0.627-3.91-2.57-3.63zM77.351 0c-0.7-0.104-1.59 0.372-1.711 2.065-0.027 0.262-0.042 0.565-0.042 0.872 0 0.662 0.071 1.307 0.205 1.928 0.267-1.167 1.035-2.053 2.043-2.487 1.29-0.551 0.724-2.195-0.495-2.378zM75.688 7.321l4.781-0.122 0.292-0.981h-10.092l5.043 16.749 2.716-8.996-2.369-0.104 2.43-0.11 0.317-1.042-2.296-0.116 2.363-0.116 0.262-0.871-2.327-0.11 2.4-0.122 0.335-1.127-3.703-0.122 3.782-0.122 0.353-1.182-3.642-0.122 3.715-0.116 0.347-1.157-4.708-0.116z" />
    </SvgIcon>
  );
};

Logo.propTypes = {
  className: PropTypes.string
};

export default Logo;