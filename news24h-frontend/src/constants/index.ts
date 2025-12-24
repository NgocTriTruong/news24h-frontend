import type { Category } from '../types';

export const CATEGORIES: Category[] = [
  { 
    slug: 'tin-tuc', 
    name: 'TIN TỨC',
    subcategories: [
      { slug: 'tin-tuc-trong-ngay', name: 'Tin tức trong ngày' },
      { slug: 'chinh-tri-xa-hoi', name: 'Chính trị - Xã hội' },
      { slug: 'ban-tre-cuoc-song', name: 'Bạn trẻ - Cuộc sống' },
      { slug: 'doi-song-dan-sinh', name: 'Đời sống - Dân sinh' },
      { slug: 'giao-thong-do-thi', name: 'Giao thông - Đô thị' },
      { slug: 'nong-tren-mang', name: 'Nóng trên mạng' },
      { slug: 'du-bao-thoi-tiet', name: 'Dự báo thời tiết' },
    ]
  },
  { 
    slug: 'bong-da', 
    name: 'BÓNG ĐÁ',
    subcategories: [
      { slug: 'lich-thi-dau', name: 'Lịch thi đấu' },
      { slug: 'ket-qua', name: 'Kết quả' },
      { slug: 'bxh', name: 'Bảng xếp hạng' },
      { slug: 'cup-c1', name: 'Cup C1' },
      { slug: 'ngoai-hang-anh', name: 'Ngoại hạng Anh' },
      { slug: 'la-liga', name: 'La Liga' },
      { slug: 'serie-a', name: 'Serie A' },
      { slug: 'bundesliga', name: 'Bundesliga' },
      { slug: 'v-league', name: 'V-League' },
      { slug: 'tran-cau-dinh', name: 'Trận cầu đỉnh' },
      { slug: 'ngoi-sao-bong-da', name: 'Ngôi sao bóng đá' },
      { slug: 'tin-van-bong-da', name: 'Điểm tin bóng đá' },
      { slug: 'chuyen-nhuong', name: 'Tin chuyển nhượng' },
      { slug: 'doi-bong-noi-bat', name: 'Đội bóng nổi bật' },
    ]
  },
  { 
    slug: 'kinh-doanh', 
    name: 'KINH DOANH',
    subcategories: [
      { slug: 'tai-chinh-bat-dong-san', name: 'Tài chính - Bất động sản' },
      { slug: 'thi-truong-tieu-dung', name: 'Thị trường tiêu dùng' },
      { slug: 'doanh-nghiep', name: 'Doanh nghiệp' },
      { slug: 'chung-khoan', name: 'Chứng khoán' },
      { slug: 'gia-vang', name: 'Giá vàng' },
    ]
  },
  { 
    slug: 'giai-tri', 
    name: 'GIẢI TRÍ',
    subcategories: [
      { slug: 'phim', name: 'Phim' },
      { slug: 'ca-nhac-mtv', name: 'Ca nhạc - MTV' },
      { slug: 'thoi-trang', name: 'Thời trang' },
      { slug: 'lam-dep', name: 'Làm đẹp' },
    ]
  },
  { 
    slug: 'the-thao', 
    name: 'THỂ THAO',
    subcategories: [
      { slug: 'bong-da', name: 'Bóng đá' },
      { slug: 'tennis', name: 'Tennis' },
      { slug: 'cau-long', name: 'Cầu lông' },
      { slug: 'the-thao-khac', name: 'Thể thao khác' },
    ]
  },
  { 
    slug: 'suc-khoe', 
    name: 'SỨC KHỎE',
    subcategories: [
      { slug: 'suc-khoe-doi-song', name: 'Sức khỏe - Đời sống' },
      { slug: 'dinh-duong', name: 'Dinh dưỡng' },
      { slug: 'lam-dep', name: 'Làm đẹp' },
    ]
  },
  { 
    slug: 'hi-tech', 
    name: 'HI-TECH',
    subcategories: [
      { slug: 'cong-nghe-thong-tin', name: 'Công nghệ thông tin' },
      { slug: 'thoi-trang-hi-tech', name: 'Thời trang - Hi-tech' },
      { slug: 'dien-thoai', name: 'Điện thoại' },
    ]
  },
  { 
    slug: 'the-gioi', 
    name: 'THẾ GIỚI',
    subcategories: [
      { slug: 'tin-the-gioi', name: 'Tin thế giới' },
      { slug: 'quan-su', name: 'Quân sự' },
    ]
  },
  { 
    slug: 'o-to', 
    name: 'Ô TÔ',
    subcategories: [
      { slug: 'oto', name: 'Ô tô' },
      { slug: 'xe-may', name: 'Xe máy' },
    ]
  },
];

export const getCategoryName = (slug: string): string => {
  const category = CATEGORIES.find(cat => cat.slug === slug);
  return category ? category.name : slug;
};