// app/edit/[section]/page.tsx

import { useRouter } from 'next/router';
// import EarlyLifeEdit from '../../../components/edit/EarlyLifeEdit';
// import PlayingCareerEdit from '../../../components/edit/PlayingCareerEdit';
// import CoachingCareerEdit from '../../../components/edit/CoachingCareerEdit';
// import TeamEdit from '../../../components/edit/TeamEdit';
import NotFound from '../NotFound';

const EditPage = () => {
    const router = useRouter();
    const { section } = router.query;

    if (typeof section !== 'string') {
        return <div>Loading...</div>;
    }

    switch (section) {
        case 'early-life':
            return <div>early life</div>;
        case 'playing-career':
            return <div>playing career</div>;
        case 'coaching-career':
            return <div>coaching career</div>;
        case 'team':
            return <div>team</div>;
        default:
            return <NotFound />;
    }
};

export default EditPage;
