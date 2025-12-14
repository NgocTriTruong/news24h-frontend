import type { Category } from '../types';

export const CATEGORIES: Category[] = [
  { slug: 'phim', name: 'Phim' },
  { slug: 'am-thuc', name: 'Ẩm thực' },
  { slug: 'tin-tuc-trong-ngay', name: 'Tin tức trong ngày' },
  { slug: 'thi-truong-tieu-dung', name: 'Thị trường tiêu dùng' },
  { slug: 'the-thao', name: 'Thể thao' },
  { slug: 'giao-duc-du-hoc', name: 'Giáo dục - Du học' },
  { slug: 'oto', name: 'Ô tô' },
  { slug: 'phi-thuong-ky-quac', name: 'Phi thường - Kỳ quặc' },
  { slug: 'thoi-trang-hi-tech', name: 'Thời trang - Hi-tech' },
  { slug: 'an-ninh-hinh-su', name: 'An ninh - Hình sự' },
  { slug: 'tai-chinh-bat-dong-san', name: 'Tài chính - Bất động sản' },
  { slug: 'ca-nhac-mtv', name: 'Ca nhạc - MTV' },
  { slug: 'bong-da', name: 'Bóng đá' },
  { slug: 'trang-chu', name: 'Trang chủ' },
  { slug: 'lam-dep', name: 'Làm đẹp' },
  { slug: 'thoi-trang', name: 'Thời trang' },
  { slug: 'ban-tre-cuoc-song', name: 'Bạn trẻ - Cuộc sống' },
  { slug: 'du-lich', name: 'Du lịch' },
  { slug: 'suc-khoe-doi-song', name: 'Sức khỏe - Đời sống' },
  { slug: 'cong-nghe-thong-tin', name: 'Công nghệ thông tin' },
  { slug: 'gia-vang', name: 'Giá Vàng' }
];

export const getCategoryName = (slug: string): string => {
  const category = CATEGORIES.find(cat => cat.slug === slug);
  return category ? category.name : slug;
};