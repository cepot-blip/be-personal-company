import { PrismaClient } from "@prisma/client"


export const UsersModels = new PrismaClient().users
export const AuthorModels = new PrismaClient().author
export const BiodataModels = new PrismaClient().biodata
export const AvatarModels = new PrismaClient().avatar
export const AddressModels = new PrismaClient().address
export const SectionTextModels = new PrismaClient().section_text
export const MainBannerModels = new PrismaClient().main_banner
export const BannerImageModels = new PrismaClient().banner_image
export const ConfigModels = new PrismaClient().config
export const SectionBannerModels = new PrismaClient().section_banner
export const MillesstoneModels = new PrismaClient().millesstone
export const ProductModels = new PrismaClient().product
export const BlogModels = new PrismaClient().blog
export const PressReleaseModels = new PrismaClient().press_release
export const CategoryModels = new PrismaClient().category
export const MediaModels = new PrismaClient().media
export const CurrentOpeningModels = new PrismaClient().current_opening

