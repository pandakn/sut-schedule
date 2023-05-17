const MAX_ROW = "50";
const apiUrl = import.meta.env.VITE_API_URL;

export const getCoursesData = async (
  acadyear: string,
  semester: string,
  coursecode: string,
  coursename: string
) => {
  const url = `${apiUrl}/api/courses?acadyear=${acadyear}&semester=${semester}&coursecode=${coursecode}&coursename=${coursename}&maxrow=${MAX_ROW}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.result) {
    return { status: true, data: data.result };
  } else {
    return { status: false, data: data.error };
  }
};
