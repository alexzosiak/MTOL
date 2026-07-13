import { visitorRepository } from '@/repositories/visitor.repository';

export async function getStatisticsViewModel() {
    const [totalVisitors, visitorsLastDay, visitorsByCountry] =
        await Promise.all([
            visitorRepository.countAll(),
            visitorRepository.countCreatedInLastDay(),
            visitorRepository.countByCountry(),
        ]);

    return {
        totalVisitors,
        visitorsLastDay,
        visitorsByCountry,
    };
}
