const employees = [
    {
      f_Id: 1,
      f_Image: 'https://via.placeholder.com/50',
      f_Name: 'John Doe',
      f_Email: 'john.doe@example.com',
      f_Mobile: '9540100011',
      f_Designation: 'Manager',
      f_gender: 'Male',
      f_Course: 'MBA',
      f_Createdate: '2021-01-15'
    },
    {
      f_Id: 2,
      f_Image: 'https://via.placeholder.com/50',
      f_Name: 'Jane Smith',
      f_Email: 'jane.smith@example.com',
      f_Mobile: '9540100022',
      f_Designation: 'HR',
      f_gender: 'Female',
      f_Course: 'BBA',
      f_Createdate: '2021-02-20'
    },
    {
      f_Id: 3,
      f_Image: 'https://via.placeholder.com/50',
      f_Name: 'Samuel Lee',
      f_Email: 'samuel.lee@example.com',
      f_Mobile: '9540100033',
      f_Designation: 'Sales',
      f_gender: 'Male',
      f_Course: 'BCom',
      f_Createdate: '2021-03-14'
    },
    {
      f_Id: 4,
      f_Image: 'https://via.placeholder.com/50',
      f_Name: 'Lucy Brown',
      f_Email: 'lucy.brown@example.com',
      f_Mobile: '9540100044',
      f_Designation: 'Engineer',
      f_gender: 'Female',
      f_Course: 'BTech',
      f_Createdate: '2021-04-05'
    },
    {
      f_Id: 5,
      f_Image: 'https://via.placeholder.com/50',
      f_Name: 'Michael Green',
      f_Email: 'michael.green@example.com',
      f_Mobile: '9540100055',
      f_Designation: 'Developer',
      f_gender: 'Male',
      f_Course: 'MCA',
      f_Createdate: '2021-05-10'
    },
    {
      f_Id: 6,
      f_Image: 'https://via.placeholder.com/50',
      f_Name: 'Emma Wilson',
      f_Email: 'emma.wilson@example.com',
      f_Mobile: '9540100066',
      f_Designation: 'HR',
      f_gender: 'Female',
      f_Course: 'MBA',
      f_Createdate: '2021-06-18'
    },
    {
      f_Id: 7,
      f_Image: 'https://via.placeholder.com/50',
      f_Name: 'Robert Johnson',
      f_Email: 'robert.johnson@example.com',
      f_Mobile: '9540100077',
      f_Designation: 'Analyst',
      f_gender: 'Male',
      f_Course: 'BCA',
      f_Createdate: '2021-07-22'
    },
    {
      f_Id: 8,
      f_Image: 'https://via.placeholder.com/50',
      f_Name: 'Sophia Garcia',
      f_Email: 'sophia.garcia@example.com',
      f_Mobile: '9540100088',
      f_Designation: 'Manager',
      f_gender: 'Female',
      f_Course: 'MCom',
      f_Createdate: '2021-08-30'
    },
    {
      f_Id: 9,
      f_Image: 'https://via.placeholder.com/50',
      f_Name: 'David Martinez',
      f_Email: 'david.martinez@example.com',
      f_Mobile: '9540100099',
      f_Designation: 'Sales',
      f_gender: 'Male',
      f_Course: 'BBA',
      f_Createdate: '2021-09-01'
    },
    {
      f_Id: 10,
      f_Image: 'https://via.placeholder.com/50',
      f_Name: 'Isabella Thomas',
      f_Email: 'isabella.thomas@example.com',
      f_Mobile: '9540100100',
      f_Designation: 'Engineer',
      f_gender: 'Female',
      f_Course: 'BSc',
      f_Createdate: '2021-10-11'
    },
    // Additional employees (IDs 11-20)
    {
      f_Id: 11,
      f_Image: 'https://via.placeholder.com/50',
      f_Name: 'Mason Davis',
      f_Email: 'mason.davis@example.com',
      f_Mobile: '9540100111',
      f_Designation: 'Developer',
      f_gender: 'Male',
      f_Course: 'BCA',
      f_Createdate: '2021-11-02'
    },
    {
      f_Id: 12,
      f_Image: 'https://via.placeholder.com/50',
      f_Name: 'Mia Lopez',
      f_Email: 'mia.lopez@example.com',
      f_Mobile: '9540100122',
      f_Designation: 'HR',
      f_gender: 'Female',
      f_Course: 'MBA',
      f_Createdate: '2021-12-12'
    },
    {
      f_Id: 13,
      f_Image: 'https://via.placeholder.com/50',
      f_Name: 'Ethan White',
      f_Email: 'ethan.white@example.com',
      f_Mobile: '9540100133',
      f_Designation: 'Sales',
      f_gender: 'Male',
      f_Course: 'BBA',
      f_Createdate: '2022-01-20'
    },
    {
      f_Id: 14,
      f_Image: 'https://via.placeholder.com/50',
      f_Name: 'Ava Harris',
      f_Email: 'ava.harris@example.com',
      f_Mobile: '9540100144',
      f_Designation: 'Analyst',
      f_gender: 'Female',
      f_Course: 'MCA',
      f_Createdate: '2022-02-15'
    },
    {
      f_Id: 15,
      f_Image: 'https://via.placeholder.com/50',
      f_Name: 'James Clark',
      f_Email: 'james.clark@example.com',
      f_Mobile: '9540100155',
      f_Designation: 'Developer',
      f_gender: 'Male',
      f_Course: 'BSc',
      f_Createdate: '2022-03-22'
    },
    {
      f_Id: 16,
      f_Image: 'https://via.placeholder.com/50',
      f_Name: 'Ella Rodriguez',
      f_Email: 'ella.rodriguez@example.com',
      f_Mobile: '9540100166',
      f_Designation: 'HR',
      f_gender: 'Female',
      f_Course: 'MCom',
      f_Createdate: '2022-04-19'
    },
    {
      f_Id: 17,
      f_Image: 'https://via.placeholder.com/50',
      f_Name: 'Alexander Lewis',
      f_Email: 'alexander.lewis@example.com',
      f_Mobile: '9540100177',
      f_Designation: 'Manager',
      f_gender: 'Male',
      f_Course: 'MBA',
      f_Createdate: '2022-05-13'
    },
    {
      f_Id: 18,
      f_Image: 'https://via.placeholder.com/50',
      f_Name: 'Emily Walker',
      f_Email: 'emily.walker@example.com',
      f_Mobile: '9540100188',
      f_Designation: 'Sales',
      f_gender: 'Female',
      f_Course: 'BCom',
      f_Createdate: '2022-06-21'
    },
    {
      f_Id: 19,
      f_Image: 'https://via.placeholder.com/50',
      f_Name: 'Lucas Young',
      f_Email: 'lucas.young@example.com',
      f_Mobile: '9540100199',
      f_Designation: 'Developer',
      f_gender: 'Male',
      f_Course: 'BCA',
      f_Createdate: '2022-07-09'
    },
    {
      f_Id: 20,
      f_Image: 'https://via.placeholder.com/50',
      f_Name: 'Charlotte Hill',
      f_Email: 'charlotte.hill@example.com',
      f_Mobile: '9540100200',
      f_Designation: 'Analyst',
      f_gender: 'Female',
      f_Course: 'BSc',
      f_Createdate: '2022-08-30'
    }
  ];
  
  
  module.exports = { data: employees };
  