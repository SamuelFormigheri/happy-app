import User from '@modules/infra/models/User/User';
import uploadConfig from '@config/upload';
export default {
    render(user: User | null) {
        if(!user)
            return null;

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            avatar_url: uploadConfig.driver === 's3' ? ( user.avatar ? `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${user.avatar}` : null) : ( user.avatar ? `${process.env.APP_API_URL}/files/${user.avatar}` : null) ,
            created_at: user.created_at,
            updated_at: user.updated_at
        }
    },
    renderMany(users: User[]){
        return users.map(user => this.render(user));
    }
}