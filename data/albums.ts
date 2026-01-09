export interface Song {
    id: number;
    title: string;
    artist: string;
    src: string;
    cover: string;
}

export interface Album {
    id: number;
    title: string;
    artist: string;
    cover: string;
    songs: Song[];
}

// Hàm fetch albums từ API
// export async function getAlbums(): Promise<Album[]> {
//     const res = await fetch('https://huudinh.io.vn/wp-json/album-manager/v1/albums', {
//         next: { revalidate: 3600 }, // Tùy chọn: revalidate mỗi giờ nếu dùng SSR fallback
//     });
//     if (!res.ok) throw new Error('Failed to fetch albums');
//     return res.json();
// }

// export const albums: Album[] = [
//     {
//         id: 1,
//         title: "Album Hen Yeu",
//         artist: "Định",
//         cover: "/images/hen-yeu.jpg",
//         songs: [
//             {
//                 id: 1,
//                 title: "Hen Yeu",
//                 artist: "Định",
//                 src: "/music/hen-yeu.mp3",
//                 cover: "/images/hen-yeu.jpg",
//             },
//             {
//                 id: 2,
//                 title: "Mot Phut",
//                 artist: "Định",
//                 src: "/music/mot-phut.mp3",
//                 cover: "/images/mot-phut.jpg",
//             },
//             {
//                 id: 3,
//                 title: "Roi Xa",
//                 artist: "Định",
//                 src: "/music/roi-xa.mp3",
//                 cover: "/images/roi-xa.jpg",
//             },
//         ],
//     },
//     {
//         id: 2,
//         title: "Album Mot Phut",
//         artist: "Định",
//         cover: "/images/mot-phut.jpg",
//         songs: [
//             {
//                 id: 1,
//                 title: "Hen Yeu",
//                 artist: "Định",
//                 src: "/music/hen-yeu.mp3",
//                 cover: "/images/hen-yeu.jpg",
//             },
//             {
//                 id: 2,
//                 title: "Mot Phut",
//                 artist: "Định",
//                 src: "/music/mot-phut.mp3",
//                 cover: "/images/mot-phut.jpg",
//             },
//             {
//                 id: 3,
//                 title: "Roi Xa",
//                 artist: "Định",
//                 src: "/music/roi-xa.mp3",
//                 cover: "/images/roi-xa.jpg",
//             },
//         ],
//     },
// ];
