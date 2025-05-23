import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  
  // Hiệu ứng chuyển trang
  useEffect(() => {
    // Mô phỏng thời gian tải trang
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    
    // Cuộn trang lên đầu khi chuyển trang
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    return () => clearTimeout(timer);
  }, [location.pathname]);
  
  return (
    <>
      {/* Hiệu ứng loading */}
      {isLoading && (
        <div className="fixed inset-0 bg-gradient-to-r from-[#1F2937] to-[#0F172A] z-50 flex items-center justify-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-[#E4784D]/20 border-t-[#E4784D] rounded-full animate-spin"></div>
            <div className="w-16 h-16 border-4 border-[#FFCB3C]/20 border-b-[#FFCB3C] rounded-full animate-spin absolute inset-0" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
          </div>
        </div>
      )}
      
      {/* Nền trang chính với màu gradient sáng/tối */}
      <main 
        className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-[#F8FAFC] to-[#F2F7FC] transition-all duration-500 relative"
      >
        {/* Các yếu tố trang trí */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-[#FFCB3C]/5 blur-3xl opacity-60"></div>
          <div className="absolute bottom-40 left-10 w-96 h-96 rounded-full bg-[#E4784D]/5 blur-3xl opacity-60"></div>
        </div>
        
        {/* Nội dung trang */}
        <div className="relative z-10">
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;
