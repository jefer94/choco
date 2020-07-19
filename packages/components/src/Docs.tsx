import React, { ReactElement } from 'react'
// import './Docs.sass'1
// import keychain from '@choco/keychain'

/** @module components/Docs */

/**
 * @typedef {object} Doc
 * @property {number} id - Doc key.
 * @property {string} name - Doc name.
 * @property {string} description - Doc description.
 * @property {string} content - Doc content.
 */

/**
 * Generate doc object.
 *
 * @param {string} name - Doc name.
 * @param {string} description - Doc description.
 * @param {content} content - Doc content.
 * @example
 * addDoc('Awesome doc', 'Awesome description', 'Awesome content')
 * // return {
 * //   id: 'doc_0',
 * //   name: 'Awesome doc',
 * //   description: 'Awesome description',
 * //   content: 'Awesome content'
 * // }
 * @returns {Doc} Doc.
 */
// function addDoc(name, description, content) {
//   return {
//     id: keychain('doc'),
//     name,
//     description,
//     content
//   }
// }


/**
 * Generate Docs component, with examples.
 *
 * @todo Store and load examples.
 * @todo Sync in the cloud algorithms.
 * @example
 * import React from 'react'
 * import Docs from 'components/Docs'
 *
 * const Component = () => <Docs />
 * @returns {object} Docs.
 */
export function Docs(): ReactElement {
  // const docs = [
  //   addDoc('hola', 'asdasdsaddsasddsadsadaddsaa'),
  //   addDoc('hola', 'asdasdsaddsasddsadsadaddsaa'),
  //   addDoc('hola', 'asdasdsaddsasddsadsadaddsaa'),
  //   addDoc('hola', 'asdasdsaddsasddsadsadaddsaa'),
  //   addDoc('hola', 'asdasdsaddsasddsadsadaddsaa'),
  //   addDoc('hola', 'asdasdsaddsasddsadsadaddsaa'),
  //   addDoc('hola', 'asdasdsaddsasddsadsadaddsaa')
  // ]
  return (
    <div className="algorithm-docs-wrapper">
      {/* <IonSearchbar mode="ios" />
      <IonGrid>
        <IonRow>
          <IonCol size-xs="12" size-lg="6">
            <IonList>
              <IonListHeader mode="ios">Save</IonListHeader>
              {docs.map(({ id, name, description }) => (
                <IonItem key={id}>
                  <IonLabel>
                    <h1>{name}</h1>
                    <p>{description}</p>
                  </IonLabel>

                  <IonButton slot="end">Load</IonButton>
                </IonItem>
              ))}
            </IonList>
          </IonCol>
          <IonCol size-xs="12" size-lg="6">
            <IonList>
              <IonListHeader mode="ios">Tutorial</IonListHeader>
              {docs.map(({ id, name, description }) => (
                <IonItem key={id}>
                  <IonLabel>
                    <h1>{name}</h1>
                    <p>{description}</p>
                  </IonLabel>
                  <IonButton slot="end">Load</IonButton>
                </IonItem>
              ))}
            </IonList>
          </IonCol>
        </IonRow>
      </IonGrid> */}
    </div>
  )
}
