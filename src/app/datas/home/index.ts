
const img1 = "https://images.pexels.com/photos/220383/pexels-photo-220383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

export type typeSlider = {
    key: number,
    image: string,
    title: string
}

export const slider: typeSlider[] = [
    {
        key: 0,
        image: img1,
        title: "Velo"
    },
    {
        key: 2,
        image: "https://images.pexels.com/photos/2261484/pexels-photo-2261484.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        title: "Booking"
    },
    {
        key: 3,
        image: "https://images.pexels.com/photos/4663829/pexels-photo-4663829.jpeg?auto=compress&cs=tinysrgb&w=1200",
        title: "App"
    },
    {
        key: 4,
        image: "https://images.pexels.com/photos/264384/pexels-photo-264384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        title: "Velo"
    }
]