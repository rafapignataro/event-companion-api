"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaMarkersRepository = void 0;
const prisma_1 = require("../../../infra/prisma");
class PrismaMarkersRepository {
    constructor(prismaTransactionClient) {
        this.prismaClient = prisma_1.prisma;
        if (prismaTransactionClient)
            this.prismaClient = prismaTransactionClient;
    }
    async findById(id) {
        const marker = await this.prismaClient.marker.findUnique({
            where: {
                id,
            },
            include: {
                visitor: {
                    include: {
                        customer: {
                            include: {
                                user: true
                            }
                        }
                    }
                }
            }
        });
        return marker;
    }
    async findByVisitorAndEventId(visitorId, eventId) {
        const marker = await this.prismaClient.marker.findFirst({
            where: {
                visitorId,
                eventId,
            },
            include: {
                visitor: {
                    include: {
                        customer: {
                            include: {
                                user: true
                            }
                        }
                    }
                }
            }
        });
        return marker;
    }
    async findAll({ visitorId, eventId }) {
        const markers = await this.prismaClient.marker.findMany({
            where: {
                visitorId,
                eventId
            },
            include: {
                visitor: {
                    include: {
                        customer: {
                            include: {
                                user: true
                            }
                        }
                    }
                }
            }
        });
        return markers;
    }
    async create(data) {
        const marker = await this.prismaClient.marker.create({
            data,
            include: {
                visitor: {
                    include: {
                        customer: {
                            include: {
                                user: true
                            }
                        }
                    }
                }
            }
        });
        return marker;
    }
    async update(id, data) {
        const marker = await this.prismaClient.marker.update({
            where: {
                id,
            },
            data,
            include: {
                visitor: {
                    include: {
                        customer: {
                            include: {
                                user: true
                            }
                        }
                    }
                }
            }
        });
        return marker;
    }
    async delete(id) {
        await this.prismaClient.marker.delete({
            where: {
                id,
            },
        });
    }
}
exports.PrismaMarkersRepository = PrismaMarkersRepository;
