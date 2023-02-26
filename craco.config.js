const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@helperService': path.resolve(__dirname, 'src/services/helperServices/helperService'),
      '@firebaseActions': path.resolve(__dirname, 'src/services/firebase/firebaseActions'),
      '@firebaseConfig': path.resolve(__dirname, 'src/services/firebase/firebaseConfig'),
      '@constants': path.resolve(__dirname, 'src/services/constants/constants'),
      '@authService': path.resolve(__dirname, 'src/services/auth/authService'),
      '@formValidationService': path.resolve(__dirname, 'src/services/formValidation/formValidationService'),
      '@interfaces': path.resolve(__dirname, 'src/interfaces/interfaces'),
      '@reduxActions': path.resolve(__dirname, 'src/redux/actions'),
      '@reduxStore': path.resolve(__dirname, 'src/redux/store'),
    },
  },
};
