import OrphanageImages from '@modules/infra/models/Orphanage/OrphanageImages';

export default {
    render(orphanageImages: OrphanageImages | null) {
        if(!orphanageImages)
            return null;
            
        return {
            id: orphanageImages.id,
            url: `${process.env.APP_API_URL}/files/${orphanageImages.path}`
        }
    },
    renderMany(orphanages: OrphanageImages[]){
        return orphanages.map(orphanage => this.render(orphanage));
    }
}