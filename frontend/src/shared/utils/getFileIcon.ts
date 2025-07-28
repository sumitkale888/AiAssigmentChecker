// Helper function
const getFileIcon = (fileName: string): string => {
  const extension = fileName.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'pdf':
      return '/img/pdf-icon.png';
    case 'doc':
    case 'docx':
      return '/img/word-icon.png';
    case 'ppt':
    case 'pptx':
      return '/img/ppt-icon.png';
    case 'xls':
    case 'xlsx':
      return '/img/excel-icon.png';
    case 'jpg':
    case 'jpeg':
    case 'png':
      return '/img/image-icon.png';
    default:
      return '/img/default-doc-thumbnail.png';
  }
};

export default getFileIcon;