import React from 'react';
import ViewLessonMaterials from '../../components/LectureMaterials/ViewLectureMaterials';


const ViewLesson: React.FC<{}> = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const lectureId = searchParams.get('lectureId');
  return (
    <div>
      <ViewLessonMaterials id_lecture={lectureId} />
    </div>
  );
};

export default ViewLesson;