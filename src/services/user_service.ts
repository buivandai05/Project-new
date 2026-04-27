import { getConnection } from "../config/database";

const handleCreateUser = async (fullname: string, email: string, addrest: string) => {
    const connection = await getConnection();
    // insert database
    try {
        const sql = 'INSERT INTO `user`(`name`, `email`,`addrest`) VALUES (?, ?,?)';
        const values = [fullname, email, addrest];

        const [result, fields] = await connection.execute(sql, values);
        return result;

    } catch (err) {
        console.log(err)
        return [];
    }
};

const getAllUsers = async () => {
    const connection = await getConnection();
    try {
        const [results, fields] = await connection.query(
            'SELECT*FROM `user`'
        );
        return results;
    } catch (err) {
        console.log(err)
        return [];
    }

};

export { handleCreateUser, getAllUsers };