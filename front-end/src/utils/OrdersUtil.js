export const getLocation = (path) => {
  if (path.includes('seller')) {
    return 'seller';
  }
  return 'customer';
};

export const formatDate = (date) => {
  let formattedDate = new Date(date);
  formattedDate = formattedDate.toLocaleDateString('pt-BR');
  return formattedDate;
};

export const statusColor = (status) => {
  switch (status) {
  case 'Pendente':
    return 'bg-[#CCB800]';
  case 'Entregue':
    return 'bg-[#00CC9B]';
  case 'Preparando':
    return 'bg-[#66CC00]';
  default:
    return 'bg-gray-400';
  }
};
