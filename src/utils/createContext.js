import { verifyToken } from './jwt';

export default function context({ req }) {
  return {
    currentUser: verifyToken(req && req.headers),
  }
}
