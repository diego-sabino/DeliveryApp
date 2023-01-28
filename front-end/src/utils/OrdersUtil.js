export default function getLocation(path) {
  if (path.includes('seller')) {
    return 'seller';
  }
  return 'customer';
}
