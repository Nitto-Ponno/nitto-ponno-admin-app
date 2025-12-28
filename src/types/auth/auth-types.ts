export type TUser = {
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  _id: string;
};

export type TSignupUser = {
  email: string;
  password: string;
  phoneNumber: string;
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
};
