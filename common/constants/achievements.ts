import { AchievementItem } from "../types/achievements";

export const ACHIEVEMENTS_DUMMY: AchievementItem[] = [
    {
        id: 1,
        name: "Belajar Dasar Pemrograman Web",
        issuing_organization: "Dicoding Indonesia",
        url_credential: "https://dicoding.com",
        issue_date: "2024-01-01",
        image: "/images/achievements/certificates/belajar-dasar-html.png",
        category: "Course",
        is_show: true
    },
    {
        id: 2,
        name: "Google Cloud Computing Foundations",
        issuing_organization: "Google Cloud",
        url_credential: "https://cloud.google.com",
        issue_date: "2023-12-01",
        image: "/images/achievements/certificates/build-a-secure-google-cloud-network-skill-badge.png",
        category: "Certification",
        is_show: true
    }
];
