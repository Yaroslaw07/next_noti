import db from "@/lib/db";

export const CreateUser = async (newUser: User) => {
  const user = await db.user.create({
    data: {
      id: newUser.id,
      email: newUser.email,
      password: newUser.password,
      username: newUser.username,
    },
  })
  return user;
};

export const GetUserByEmail = async (email: string) => {
  const user = await db.user.findFirst({ where: { email: email } });
  return user;
};

export const GetUserById =  async (id: string) => { 
  return await db.user.findFirst({where: {id: id}});
}