export type TUser = {
  name: string;
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
