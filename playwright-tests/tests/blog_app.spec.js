import{test,expect,beforeEach,describe} from'@playwright/test';
import { setEnvironmentData } from 'worker_threads';

describe('Blog app',() => {
  beforeEach(async({page,request}) => {
    await request.post('http://localhost:3003/api/testing/reset')

    await request.post('http://localhost:3003/api/users', {  
      data:{
        username: 'Stevie',
        password: 'xiaoshabi',
        name: 'Steven Rapson'
      }       
    })
    await page.goto('http://localhost:5173')
  })
  test('Login form is shown', async({page}) => {
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
    await expect(page.getByText('log in to application')).toBeVisible()
    await expect(page.getByRole('button',{name:'login'})).toBeVisible()
    //creating a locator obj that points to the first<form> element on the page
    const form=page.locator('form');
    await expect(form).toBeVisible();
  })
  describe('Login',() => {
    test('succeeds with correct credentials',async({page})=>{
      await page.getByRole('textbox').first().fill('Stevie')
      await page.getByRole('textbox').last().fill('xiaoshabi')
      await page.getByRole('button',{name:'login'}).click()
      await expect(page.getByText('Stevie is logged in')).toBeVisible() 
    })
    test('fails with wrong credentials', async({page}) => {
      await page.getByRole('textbox').first().fill('xinny')
      await page.getByRole('textbox').last().fill('123456')
      await page.getByRole('button',{name:'login'}).click()
      await expect(page.getByText('log in to application')).toBeVisible()
    })
  })
  describe('when logged in', () => {
    beforeEach(async({page})=>{
      await page.getByRole('textbox').first().fill('Stevie')
      await page.getByRole('textbox').last().fill('xiaoshabi')
      await page.getByRole('button',{name:'login'}).click()
    })
    test('a new blog can be created', async({page}) => {
      await page.getByRole('button',{name:'new Blog'}).click()
      const textboxes=await page.getByRole('textbox').all()
      await textboxes[0].fill('Security in the age of Gen AI')
      await textboxes[1].fill('Jim Taylor')
      await textboxes[2].fill('www.theta.co.nz')
      await page.getByRole('button',{name:'Submit'}).click()
      await expect(page.getByText('TITLE:Security in the age of Gen AI AUTHOR:Jim Taylor')).toBeVisible()
    })
    describe('and a blog exists',()=>{
      beforeEach(async({page})=>{
      await page.getByRole('button',{name:'new Blog'}).click()
      const textboxes=await page.getByRole('textbox').all()
      await textboxes[0].fill('Security in the age of Gen AI')
      await textboxes[1].fill('Jim Taylor')
      await textboxes[2].fill('www.theta.co.nz')
      await page.getByRole('button',{name:'Submit'}).click()
      })

      test('a blog can be liked',async({page}) =>{
        await page.getByRole('button',{name:'view'}).click()
        await expect(page.getByRole('button',{name:'like'})).toBeVisible();
       })
       test('a blog can be deleted by the user who added it', async({page}) => {
        await page.getByRole('button',{name:'view'}).click()
        await page.getByRole('button',{name:'remove'}).click()

        page.on('dialog', async dialog => {
          expect(dialog.type()).toBe('confirm')
          expect(dialog.message()).toContain('Do you really want to delete Security in the age of Gen AI')
          await dialog.accept() 
        })
        await expect(page.getByText('TITLE:Security in the age of Gen AI AUTHOR:Jim Taylor')).not.toBeVisible()
       })

       test('delete button is not shown for blogs added by other users', async({page, request}) => {
        // logout current user
        await page.getByRole('button',{name:'logout'}).click()
        
        // create another user
        await request.post('http://localhost:3003/api/users', {  
          data:{
            username: 'newUser',
            password: 'password123',
            name: 'New User'
          }       
        })
        
        // login as the new user
        await page.getByRole('textbox').first().fill('newUser')
        await page.getByRole('textbox').last().fill('password123')
        await page.getByRole('button',{name:'login'}).click()
        
        // view the blog created by the first user
        await page.getByRole('button',{name:'view'}).click()
        
        // verify delete button is not visible for this user
        await expect(page.getByRole('button',{name:'delete'})).not.toBeVisible()
      })

    })   
  })
})