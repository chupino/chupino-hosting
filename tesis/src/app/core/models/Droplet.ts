export interface Droplet {
    id: number;
    name: string;
    memory: number;
    vcpus: number;
    disk: number;
    status: string;
    created_at: string;
    ip_address: string;
    region: string;
    image: string;
    size: string;
}