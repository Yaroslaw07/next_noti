
let user: User[] = [];

export const CreateUser = (newUser: User) => {
  user.push(newUser);
  return newUser;
};

export const GetUserByEmail = (email: string) => {
  console.log(email,user);
  return user.find((u) => u.email === email);
};

export const GetUserById = (id: string) => { 
  return user.find((u) => u.id === id);
}