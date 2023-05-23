import React from 'react';

const withAuth = (WrappedComponent: React.ComponentType<any>, allowedRoles: number[]) => {
  const WithAuth: React.FC<any> = (props) => {
    const user = JSON.parse(localStorage.getItem('utilizator') || '{}');
    const token = localStorage.getItem('token');
    if (!token || !user) {
      localStorage.removeItem('token');
      localStorage.removeItem('utilizator');
      window.location.href = '/';
      return null;
    } else if (!allowedRoles.includes(user.role) || WrappedComponent.name === 'LoginRender') {
        if (user.role == 0) window.location.href = "/Admin";
        else if (user.role == 1) window.location.href = "/Professor";
        else if (user.role == 2) window.location.href = "/Student";
      return null;
    }
    return <WrappedComponent {...props} />;
  };
  return WithAuth;
};

export default withAuth;