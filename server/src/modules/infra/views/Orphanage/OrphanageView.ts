import Orphanage from '@modules/infra/models/Orphanage/Orphanage';
import OrphanageImagesView from './OrphanageImagesView';

export default {
    render(orphanage: Orphanage | null) {
        if(!orphanage)
            return null;

        return {
            id: orphanage.id,
            name: orphanage.name,
            latitude: Number(orphanage.latitude),
            longitude: Number(orphanage.longitude),
            about: orphanage.about,
            instructions: orphanage.instructions,
            opening_hours: orphanage.opening_hours,
            open_on_weekends: orphanage.open_on_weekends,
            images: OrphanageImagesView.renderMany(orphanage.images)
        }
    },
    renderMany(orphanages: Orphanage[]){
        return orphanages.map(orphanage => this.render(orphanage));
    }
}