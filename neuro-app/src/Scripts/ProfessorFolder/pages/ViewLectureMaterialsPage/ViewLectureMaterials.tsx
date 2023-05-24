import React from 'react';
import ViewLessonMaterials from '../../components/LectureMaterials/ViewLectureMaterials';
import { useLocation } from 'react-router-dom';


const ViewLesson: React.FC<{}> = () => {
  const location = useLocation();
    const lectureId = location.state.lectureId;

  return (
    <div>
      <ViewLessonMaterials id_lecture={lectureId} />
    </div>
  );
};

export default ViewLesson;