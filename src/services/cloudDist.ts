/*
 * @Author: your name
 * @Date: 2022-01-17 18:03:11
 * @LastEditTime: 2022-04-19 09:51:49
 * @LastEditors: zhangjicheng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\services\cloudDist.ts
 */

import request from '@/utils/request';

/**
 * 获取文件列表
 * @params: {id?: string}
 */
interface getDistMenuProps {
  id?: string;
}
export async function getDistMenu(params: getDistMenuProps) {
  return request({
    url: '/api/clouddisk/getDiskFiles',
    method: 'get',
    params,
  });
}

/**
 * 新建文件
 * @param {id: string, name: string}
 */
interface insertDirProps {
  id: string;
  name: string;
}
export async function insertDir(params: insertDirProps) {
  return request({
    url: '/api/clouddisk/insertDir',
    method: 'get',
    params,
  });
}

/**
 * 上传文件
 * @param {id: string, file: Blob}
 */
interface uploadFileProps {
  id?: string;
  file: Blob;
}
export async function uploadFile(params: uploadFileProps) {
  const { id = '', file } = params;
  const formData = new FormData();
  formData.append('file', file);
  formData.append('id', id);
  return request({
    url: '/api/clouddisk/upload',
    method: 'post',
    body: formData,
    // headers: { 'Content-Type': 'multipart/form-data'}
  });
}

/**
 * 删除文件
 * @param {id: string}
 */
interface deleteFileProps {
  id: string;
}
export async function deleteFile(params: deleteFileProps) {
  return request({
    url: '/api/clouddisk/deleteFile',
    method: 'get',
    params,
  });
}

/**
 * 文件重命名
 * @param {id: string, name: string}
 */
interface renameProps {
  id: string;
  name: string;
}
export async function renameFile(params: renameProps) {
  return request({
    url: '/api/clouddisk/renameFiles',
    method: 'get',
    params,
  });
}
