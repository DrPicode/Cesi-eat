import { memo } from 'react';
import type { FC } from 'react';

import resets from '../_resets.module.css';
import classes from './SignIn.module.css';
import { UnionIcon2 } from './UnionIcon2.js';
import { UnionIcon } from './UnionIcon.js';

interface Props {
  className?: string;
}

export const SignIn: FC<Props> = memo(function SignIn() {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.cESIEats}> CESI Eats</div>
      <div className={classes.bol1}></div>
      <div className={classes.restaurateur}>Restaurateur</div>
      <div className={classes.frame2}>
        <div className={classes.logo}></div>
      </div>
      <div className={classes.frame22}>
        <div className={classes.logo2}></div>
      </div>
      <div className={classes.rectangle37}></div>
      <div className={classes.aPropos}>A propos</div>
      <div className={classes.aideEtSupport}>Aide et Support</div>
      <div className={classes.frame37}>
        <div className={classes.cESIEats2}>CESI Eats</div>
      </div>
      <div className={classes.cGV}>CGV</div>
      <div className={classes.union}>
        <UnionIcon className={classes.icon} />
      </div>
      <div className={classes.union2}>
        <UnionIcon2 className={classes.icon2} />
      </div>
      <div className={classes.rectangle30}></div>
      <div className={classes.seConnecter}>Se connecter</div>
      <div className={classes.frame131}>
        <div className={classes.connexion}>Connexion</div>
      </div>
      <div className={classes.frame132}>
        <div className={classes.creerUnCompte}>Créer un compte</div>
      </div>
      <div className={classes.rectangle31}></div>
      <div className={classes.rectangle32}></div>
      <div className={classes.adresseEMail}>Adresse e-mail</div>
      <div className={classes.motDePasse}>Mot de passe</div>
      <div className={classes.motDePasseOublie}>Mot de passe oublié ?</div>
    </div>
  );
});
