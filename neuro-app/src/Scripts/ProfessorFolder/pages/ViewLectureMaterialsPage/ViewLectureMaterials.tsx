import React from 'react';
import ViewLessonMaterials from '../../components/LectureMaterials/ViewLectureMaterials';


const ViewLesson: React.FC<{}> = () => {
  return (
    <div>
      <ViewLessonMaterials id_lecture="1" />
    </div>
  );
};

export default ViewLesson;