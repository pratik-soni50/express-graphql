import verify from 'jsonwebtoken/verify';
import sign from 'jsonwebtoken/sign';

const secrate = 'kdsalfjlaeurbfheypqureyeuhafyuaiufasiofsdakhgfjsa';

export const generateToken = (userData) => {
  return sign({ data: userData }, secrate, { expiresIn: '12h' });
}

export const verifyToken = (headers) => {
  try {
    if (headers && headers.authentication) {
      return verify(headers.authentication, secrate).data;
    }
    return null;
  } catch (err) {
    return null;
  }
}
