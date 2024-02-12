import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateMediaDto } from './dto/update-media.dto';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

import { Duplex } from 'stream';
import { CreateMediaDto } from './dto/create-media.dto';
import { Repository } from 'typeorm';
import { Media } from './entities/media.entity';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class MediaService {
  constructor(
    @Inject('MEDIA_REPOSITORY')
    private readonly mediaRepository: Repository<Media>,
  ) {}

  /**
   * Create a new media and upload it to the server
   * @param createMediaDto
   * @param file
   */
  async create(createMediaDto: CreateMediaDto, file: Express.Multer.File) {
    const fileData = await this.uploadFile(file);

    if (createMediaDto.title) {
      const existingMedia = await this.findByTitle(createMediaDto.title);
      if (existingMedia) {
        fs.unlinkSync(fileData.filepath);
        throw new ConflictException('Media with this title already exists');
      }
    }
    const media = new Media();
    media.title = createMediaDto.title;
    media.description = createMediaDto.description;
    media.filename = fileData.filename;
    media.filepath = fileData.filepath;
    media.mimetype = fileData.mimetype;
    media.size = fileData.size;
    return await this.mediaRepository.save(media);
  }

  findByTitle(title: string) {
    return this.mediaRepository.findOne({
      where: {
        title,
      },
    });
  }

  findAll(query: PaginateQuery): Promise<Paginated<Media>> {
    return paginate(query, this.mediaRepository, {
      sortableColumns: [
        'id',
        'title',
        'filepath',
        'filename',
        'mimetype',
        'size',
        'createdAt',
        'updatedAt',
      ],
      defaultSortBy: [['id', 'ASC']],
      searchableColumns: [
        'title',
        'filepath',
        'filename',
        'mimetype',
        'size',
        'description',
      ],
      select: [
        'id',
        'title',
        'filepath',
        'filename',
        'mimetype',
        'size',
        'description',
        'createdAt',
        'updatedAt',
      ],
    });
  }

  async findOne(id: string): Promise<Media> {
    const media = await this.mediaRepository.findOne({
      where: {
        id,
      },
    });
    if (!media) {
      throw new NotFoundException('Media not found');
    }
    return media;
  }

  async update(
    id: string,
    updateMediaDto?: UpdateMediaDto,
    file?: Express.Multer.File,
  ) {
    const media: Media = await this.findOne(id);
    let updateDto = {};
    if (file) {
      const filedData = await this.uploadFile(file);
      media.filename = filedData.filename;
      media.filepath = filedData.filepath;
      media.mimetype = filedData.mimetype;
      media.size = filedData.size;
      updateDto = {
        filename: filedData.filename,
        filepath: filedData.filepath,
        mimetype: filedData.mimetype,
        size: filedData.size,
      };
    }
    if (updateMediaDto?.title) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      updateDto.title = updateMediaDto.title;
    }
    if (updateMediaDto?.description) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      updateDto.description = updateMediaDto.description;
    }
    return await this.mediaRepository.update(id, updateDto);
  }

  async remove(id: string) {
    const media = await this.findOne(id);
    if (!media) {
      throw new NotFoundException('Media not found');
    }
    fs.unlinkSync(media.filepath);
    return await this.mediaRepository.delete(id);
  }

  /**
   * Upload a file and return the file data
   * @param file
   */
  uploadFile(file: Express.Multer.File): Promise<any> {
    const uploadDir = path.resolve(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const fileExtension = path.extname(file.originalname);
    const filename = uuidv4() + fileExtension;
    const filepath = path.resolve(__dirname, '../../uploads', filename);
    const filesize = file.size;

    // Crée un stream de lecture à partir du buffer du fichier téléchargé
    const readStream = this.bufferToStream(file.buffer);

    // Crée un stream d'écriture pour le nouveau fichier
    const writeStream = fs.createWriteStream(filepath);

    // Pipe le stream de lecture vers le stream d'écriture
    readStream.pipe(writeStream);
    const fileData = {
      filename,
      filepath,
      size: filesize,
      mimetype: file.mimetype,
    };

    return new Promise((resolve, reject) => {
      writeStream.on('finish', () => resolve(fileData));
      writeStream.on('error', reject);
    });
  }

  /**
   * Convert a buffer to a stream
   * @param buffer
   * @private
   */
  private bufferToStream(buffer: Buffer) {
    const stream = new Duplex();
    stream.push(buffer);
    stream.push(null); // Signale la fin du stream
    return stream;
  }
}
