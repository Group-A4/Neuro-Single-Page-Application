import React from 'react';
import ViewLessonMaterials from '../../components/LectureMaterials/ViewLectureMaterials';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import WithAuth from '../../../../WithAuth';


const ViewLesson: React.FC<{}> = () => {
  const location = useLocation();
    const lectureId = location.state?.lectureId;
    const navigate = useNavigate();

    useEffect(() => {
      if(!lectureId){
          navigate('/');
      }
  }, [lectureId, navigate]);

  return (
    <div>
      <ViewLessonMaterials id_lecture={lectureId} />
    </div>
  );
};

export default WithAuth(ViewLesson, [1, 2]);