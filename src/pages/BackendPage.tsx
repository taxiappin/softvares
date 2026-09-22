import React, { useEffect } from 'react';
import { SiteData } from '../types';
import { AdminCMS } from '../components/AdminCMS';

interface BackendPageProps {
  data: SiteData;
  onUpdateData: (newData: SiteData) => void;
  onNavigateHome: () => void;
}

export const BackendPage: React.FC<BackendPageProps> = ({
  data,
  onUpdateData,
  onNavigateHome,
}) => {
  useEffect(() => {
    document.title = `${data.brand.name} Backend Controls • /backend`;
  }, [data.brand.name]);

  return (
    <div className="min-h-screen bg-[#f1f3f7] flex flex-col">
      <AdminCMS
        data={data}
        onUpdateData={onUpdateData}
        onClose={onNavigateHome}
      />
    </div>
  );
};

export default BackendPage;
