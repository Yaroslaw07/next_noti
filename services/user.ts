
let user: User[] = [];

export const createUser = (newUser: User) => {
  user.push(newUser);
  return newUser;
};

export const findUser = (email: string) => {
  console.log(email,user);
  return user.find((u) => u.email === email);
};

export const GetUser = (id: string) => { 
  return user.find((u) => u.id === id);
}