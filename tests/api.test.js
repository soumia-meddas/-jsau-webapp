nock.recorder.rec();
import { mount } from '@vue/test-utils';
import nock from 'nock';
import AppFetch from '../src/components/AppFetch.vue';  
describe('AppFetch.vue', () => {
  afterEach(() => {
   
    nock.cleanAll();
  });
  beforeEach(() => {
    
    nock.cleanAll();
  });
   
  test('should download a file successfully', async () => {
    nock('https://web-2.local.test')
      .get('/api/documents/example.html')
      .reply(200, 'Dummy file content', { 'Content-Type': 'text/plain' });
  
    const wrapper = mount(AppFetch);
  
    const input = wrapper.find('input[placeholder="Nom du fichier (ex. example.html)"]');
    await input.setValue('example.html');  
    await wrapper.vm.$nextTick();  
    expect(wrapper.vm.downloadFilename).toBe('example.html');  
  });
  

  test('should remove a favorite from the list', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
    });
    const wrapper = mount(AppFetch, {
      data() {
        return {
          favorites: [{ id: 1, filename: 'example.txt' }],  
          favoriteMessage: '',
          newFavorite: '',
        };
      },
    });
  
    let favoriteItems = wrapper.findAll('.favorite-item');
    expect(favoriteItems.length).toBe(1);
    const deleteButton = wrapper.find('.favorite-item .delete-button');
    await deleteButton.trigger('click');
    await wrapper.vm.$nextTick();
    favoriteItems = wrapper.findAll('.favorite-item');
    expect(favoriteItems.length).toBe(0); 
    expect(wrapper.vm.favorites).toEqual([]); 
  
    expect(wrapper.vm.favoriteMessage).toBe('Favori supprimé.');
  
    global.fetch.mockRestore();
  });
});  