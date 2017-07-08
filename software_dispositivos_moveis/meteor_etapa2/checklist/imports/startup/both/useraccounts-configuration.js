import { AccountsTemplates } from 'meteor/useraccounts:core';

/**
 * The useraccounts package must be configured for both client and server to work properly.
 * See the Guide for reference (https://github.com/meteor-useraccounts/core/blob/master/Guide.md)
 */

AccountsTemplates.configure({
  showForgotPasswordLink: true,
  defaultTemplate: 'Auth_page',
  defaultLayout: 'homeLayout',
  defaultContentRegion: 'main',
  defaultLayoutRegions: {},
});

AccountsTemplates.configureRoute('signIn', {
  name: 'signin',
  path: '/signin',
});

AccountsTemplates.configureRoute('signUp', {
  name: 'join',
  path: '/join',
});

AccountsTemplates.configureRoute('forgotPwd');

AccountsTemplates.configureRoute('resetPwd', {
  name: 'resetPwd',
  path: '/reset-password',
});

if(Meteor.isServer){
  import {Categories} from '/imports/api/categories/categories.js'
  import {Items} from '/imports/api/items/items.js'
  AccountsTemplates.configure({
      /*...*/
      postSignUpHook: function(userId, info){
        const roupas = Categories.insert({
          name: "Roupas",
          userId: userId
        });
        const higiene = Categories.insert({
          name: "Higiene",
          userId: userId
        });
        const entretenimento = Categories.insert({
          name: "Entretenimento",
          userId: userId
        });
        const trabalho = Categories.insert({
          name: "Trabalho",
          userId: userId
        });
        const banho = Categories.insert({
          name: "Banho",
          userId: userId
        });
        Items.insert({
          name: "Roupa íntima",
          daily: true,
          category_id: roupas,
          userId: userId
        })
        Items.insert({
          name: "Meias",
          daily: true,
          category_id: roupas,
          userId: userId
        })
        Items.insert({
          name: "Casaco",
          daily: true,
          category_id: roupas,
          userId: userId
        })
        Items.insert({
          name: "Escova de dentes",
          daily: true,
          category_id: higiene,
          userId: userId
        })
        Items.insert({
          name: "Sabonete",
          daily: true,
          category_id: higiene,
          userId: userId
        })
        Items.insert({
          name: "Talco",
          daily: true,
          category_id: higiene,
          userId: userId
        })
        Items.insert({
          name: "Toalha de banho",
          daily: true,
          category_id: banho,
          userId: userId
        })
        Items.insert({
          name: "Shampoo",
          daily: true,
          category_id: banho,
          userId: userId
        })
        Items.insert({
          name: "Video-game",
          daily: true,
          category_id: entretenimento,
          userId: userId
        })
        Items.insert({
          name: "Câmera fotográfica",
          daily: true,
          category_id: entretenimento,
          userId: userId
        })
      },      
  });
}