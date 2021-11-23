const getUrl = apiPath => `${process.env.VUE_APP_API_BASE_URL}/${apiPath}`

export default {
  API0006: getUrl('user'), // GET ユーザー一覧検索
  API0007: getUrl('user'), // GET ユーザー詳細検索
  API0008: getUrl('user'), // PUT ユーザー更新
  API0009: getUrl('group'), // GET グループ一覧検索
  API0010: getUrl('group'), // GET グループ詳細検索 /group/{groupid}
  API0011: getUrl('group'), // POST グループ登録
  API0012: getUrl('group'), // PUT グループ更新
  API0013: getUrl('group/bulk/delete'), // POST グループ更新
  API0022: getUrl('template'), //GET  メールテンプレート一覧検索
  API0023: getUrl('template'), //GET  メールテンプレート詳細検索
  API0024: getUrl('template'), //POST  メールテンプレート登録
  API0025: getUrl('template'), //PUT  メールテンプレート更新
  API0026: getUrl('template/bulk/delete'), //POST  メールテンプレート削除
  API0031: getUrl('jobrequest'),
  API0039: getUrl('projectxkaiin'),
  API0040: getUrl('projectxkaiin'),
  API0041: getUrl('projectxkaiin'),
  API0043: getUrl('jizenmitumori'),
  API0044: getUrl('jizenmitumori'),
  API0045: getUrl('jizenmitumori'),
  API0046: getUrl('jizenmitumori'),
  API0047: getUrl('jizenmitumori/bulk/delete'),
  API0048: getUrl('jizenmitumori/renraku/gyosya'),
  API0049: getUrl('jizenmitumori/renraku/result'),
  API0051: getUrl('settigyosyacapa'), //GET 設置工事キャパ一覧検索
  API0052: getUrl('settigyosyacapa'), //PUT 設置工事キャパ一括更新
  API0053: getUrl('oogatahaisocapa'), // PUT 大型配送キャパ一括更新
  API0054: getUrl('oogatahaisocapa'), // GET 大型配送キャパ一覧検索
  API0056: getUrl('uriagedenpyo'), // GET 売上伝票一覧検索
  API0057: getUrl('uriagedenpyo'), // GET 売上伝票詳細検索 /uriagedenpyo/{denpyono}
  API0058: getUrl('uriagedenpyo'), // POST 売上伝票赤伝登録
  API0059: getUrl('uriagedenpyo'), // PUT 売上伝票更新
  API0060: getUrl('black'),
  API0061: getUrl('black'),
  API0062: getUrl('black'),
  API0063: getUrl('black'),
  API0064: getUrl('black/bulk/delete'),
  API0065: getUrl('oroshisaki'), //GET 卸先一覧検索
  API0066: getUrl('oroshisaki'), //GET 卸先詳細検索 /oroshisaki/{oroshisakicd}
  API0067: getUrl('oroshisaki'), //POST 卸先登録
  API0068: getUrl('oroshisaki'), //PUT 卸先更新
  API0069: getUrl('nounyusaki'), //GET 納入先一覧検索
  API0070: getUrl('nounyusaki'), //GET 納入先詳細検索 /nounyusaki/{nounyucd}
  API0071: getUrl('nounyusaki'), //POST 納入先登録
  API0072: getUrl('nounyusaki'), //PUT 納入先更新
  API0073: getUrl('nounyusaki'), //DELETE 納入先削除
  API0074: getUrl('zyucyu'),
  API0076: getUrl('zyucyu/karihikiate'),
  API0077: getUrl('zyucyu'),
  API0078: getUrl('zyucyu/status'),
  API0079: getUrl('zyucyu'),
  API0080: getUrl('zyucyu'),
  API0081: getUrl('zyucyu/nouhinsyo'),
  API0082: getUrl('zyucyu/ryosyusyo/print'),
  API0083: getUrl('sendzyucyumail'),
  API0084: getUrl('zyucyu/cancel'),
  API0085: getUrl('zyucyu/syuka/manual'),
  API0086: getUrl('zyucyu/option'),
  API0087: getUrl('zyucyustatus/status'),
  API0088: getUrl('zyucyustatus'),
  API0090: getUrl('zyucyumeisaistatus/status'),
  API0091: getUrl('zyucyumeisaistatus'),
  API0093: getUrl('nyukin'),
  API0094: getUrl('nyukin/bulk/delete'),
  API0097: getUrl('nyukin'),
  API0099: getUrl('nyukin'),
  API0100: getUrl('nyukin'),
  API0101: getUrl('nyukinuriagekeshikomi'),
  API0102: getUrl('nyukinuriagekeshikomi/bulk/delete'),
  API0103: getUrl('seikyusyo'),
  API0104: getUrl('seikyusyo'),
  API0105: getUrl('seikyusyo'),
  API0106: getUrl('seikyusyo'),
  API0108: getUrl('seikyusyo/print'),
  API0109: getUrl('seikyusyoSales'),
  API0110: getUrl('zaikohikiate'),
  API0111: getUrl('zaikohikiate'),
  API0113: getUrl('shikirikakaku'), //GET  shikirikakaku 仕切価格一覧検索
  API0114: getUrl('shikirikakaku/bulk/deleteRireki'), //POST shikirikakaku 仕切価格削除
  API0115: getUrl('shikirikakaku'), //GET  shikirikakaku/{sikirikakakuno}	仕切価格詳細検索
  API0116: getUrl('shikirikakaku/duplicated'), //GET shikirikakaku/duplicated 仕切価格優先重複チェック
  API0117: getUrl('shikirikakaku'), //POST shikirikakaku 仕切価格登録
  API0118: getUrl('shikirikakaku'), //PUT  shikirikakaku 仕切価格更新
  API0121: getUrl('siharaidenpyo/siiresiharaikesikomi'),
  API0122: getUrl('shiiresaki'),
  API0123: getUrl('shiiresaki/bulk/delete'),
  API0124: getUrl('shiiresaki'),
  API0125: getUrl('shiiresaki'),
  API0126: getUrl('shiiresaki'),
  API0127: getUrl('siirenebiki'),
  API0128: getUrl('siirenebiki'),
  API0129: getUrl('siirenebiki'),
  API0130: getUrl('siirenebiki/meisai/bulk'),
  API0133: getUrl('siire'),
  API0134: getUrl('siire'),
  API0136: getUrl('siire'),
  API0139: getUrl('siharaidenpyo/bulk/delete'),
  API0141: getUrl('siharaidenpyo'),
  API0142: getUrl('siharaidenpyo'),
  API0143: getUrl('siharaidenpyo/kesikomi'),
  API0147: getUrl('zyuhaccyukanri'),
  API0148: getUrl('tyokusokanryohokoku'),
  API0149: getUrl('serviceEndreport'),
  API0150: getUrl('urikireSyohin'),
  API0152: getUrl('siharaidenpyo/haccyusiharaikesikomi'),
  API0153: getUrl('haccyudenpyo'),
  API0155: getUrl('haccyudenpyo/copy'),
  API0156: getUrl('haccyudenpyo'),
  API0157: getUrl('haccyudenpyo/print'),
  API0158: getUrl('haccyudenpyo/bulk/delete'),
  API0159: getUrl('haccyudenpyo'),
  API0160: getUrl('haccyudenpyo'),
  API0161: getUrl('zaikokakaku/resale'),
  API0163: getUrl('zaikokakaku'),
  API0164: getUrl('zaikokakaku'),
  API0169: getUrl('zaikokakaku/biko'),
  API0170: getUrl('zaikokakaku/koteikakaku/rireki'),
  API0171: getUrl('zaikokakaku/sethin'),
  API0172: getUrl('zaikokakaku/timesale'),
  API0173: getUrl('zaikokakaku/timesale/item'),
  API0174: getUrl('zaikokakaku/koteikakaku'),
  API0175: getUrl('zaikokakaku/koteikakaku'),
  API0176: getUrl('zaikokakaku/okiniiri'),
  API0177: getUrl('zaikokakaku/okiniiri'),
  API0178: getUrl('zaikokakaku/okiniiri'),
  API0181: getUrl('zaikokakaku/rireki'),
  API0182: getUrl('zaikokakaku/ureyukiresearch'),
  API0183: getUrl('zaikokakaku/hacyumeisai'),
  API0184: getUrl('zaikokakaku/zyucyumeisai/tooltip'),
  API0186: getUrl('zaikokakaku/sikirikakaku'),
  API0187: getUrl('zaikokakaku/zaikomeisai'),
  API0188: getUrl('zaikokakaku/kcomjuni'),
  API0189: getUrl('catekotepoint'),
  API0190: getUrl('catekotepoint/bulk/delete'),
  API0191: getUrl('catekotepoint'),
  API0192: getUrl('catekotepoint'),
  API0194: getUrl('kihonprojectxpointritu'), //GET 基本projectxポイント率一覧検索
  API0195: getUrl('kihonprojectxpointritu'), //GET 基本projectxポイント率一括更新
  API0198: getUrl('kihonprojectxpointritu'), //POST 基本projectxポイント率登録
  API0200: getUrl('kihonprojectxpointritu/bulk/delete'), //PUT 基本Mprojectxポイント率削除
  API0201: getUrl('syokotepoint'), //GET 商品固定projectxポイント一覧検索
  API0202: getUrl('syokotepoint'), //PUT 商品固定projectxポイント一括更新
  API0203: getUrl('syokotepoint'), //POST 商品固定projectxポイント登録
  API0205: getUrl('kupon'), //GET  kuopn クーポン一覧検索
  API0206: getUrl('kupon/bulk/delete'), //PSOT kupon/bulk/delete クーポン削除
  API0207: getUrl('kupon'), //GET  kuopn/{kuponcd} クーポン一覧詳細検索
  API0208: getUrl('kupon'), //POST kuopn クーポン登録
  API0212: getUrl('kyakupon'),
  API0216: getUrl('tsale'), //GET  tsale タイムセール一覧検索
  API0217: getUrl('tsale/bulk/delete'), //POST tsale/bulk/delete タイムセール削除
  API0218: getUrl('tsale'), //POST tsale タイムセール登録
  API0222: getUrl('tsale/tsaleitem/bulk/insert'), //POST tsale/tsaleitem/bulk/insert タイムセール商品一括登録
  API0224: getUrl('tsale/tsaleitem/bulk/update'), //PUT  tsale/tsaleitem/bulk/update タイムセール商品更新
  API0227: getUrl('syohin'),
  API0229: getUrl('syohin'),
  API0231: getUrl('syohinoption'),
  API0234: getUrl('syohingrptsuidegai'),
  API0238: getUrl('syohin'),
  API0240: getUrl('syohingrp'),
  API0241: getUrl('syohingrp'),
  API0253: getUrl('catetsuide'),
  API0257: getUrl('maker'),
  API0258: getUrl('maker/delete'),
  API0259: getUrl('maker'),
  API0260: getUrl('maker'),
  API0264: getUrl('option'),
  API0265: getUrl('option/bulk/delete'),
  API0267: getUrl('option'),
  API0268: getUrl('option'),
  API0273: getUrl('syokotepoint/bulk/delete'), //PUT 商品固定projectxポイント登録
  API0276: getUrl('suggest/bumon'), //チャネルサジェスト
  API0277: getUrl('suggest/tantou'), //担当者サジェスト
  API0278: getUrl('suggest/oroshisaki'), //卸先サジェスト
  API0279: getUrl('suggest/syobun'),
  API0284: getUrl('suggest/yubin'), // 郵便番号サジェスト
  API0286: getUrl('suggest/settikojiarea'),
  API0288: getUrl('tsale'), //GET  tsale/{timsecd} タイムセール詳細検索
  API0289: getUrl('tsale'), //PUT  tsale タイムセール更新
  API0292: getUrl('zaikohikiate/syohinzyotai'),
  API0293: getUrl('zaikohikiate/iso'),
  API0296: getUrl('kupon/kuponex'), //POST kupon/kuponex クーポンカテゴリメーカー登録
  API0298: getUrl('kupon/kuponex/bulk/delete'), //POST kupon/kuponex/bulk/delete クーポン拡張マスタ削除
  API0299: getUrl('kupon/kuponex/bulk/insert'), //POST kupon/kuponex/bulk/insert クーポン商品登録
  API0301: getUrl('suggest/shiharai'),
  API0302: getUrl('tsale/tsaleitem/bulk/delete'), //POST tsale/tsaleitem/bulk/delete タイムセール商品削除
  API0304: getUrl('syohin'), // 商品サジェスト
  API0306: getUrl('option/shihahoho'),
  API0307: getUrl('option/shihahoho/bulk/delete'),
  API0308: getUrl('syohinoption/bulk/delete'),
  API0309: getUrl('uriagedenpyo/bulk/delete'), // POST 売上明細削除
  API0310: getUrl('siharaidenpyo'),
  API0311: getUrl('siharaidenpyo'),
  API0312: getUrl('zyucyustatus'),
  API0313: getUrl('zyucyumeisaistatus'),
  API0314: getUrl('suggest/shiiresaki'), //GET 仕入先サジェスト
  API0315: getUrl('siirenebiki/meisai/hacyu'),
  API0316: getUrl('siirenebiki/meisai'),
  API0317: getUrl('oogatatuikasoryo'), // GET 大型追加送料一覧検索
  API0318: getUrl('oogatatuikasoryo'), // PUT 大型追加送料更新
  API0319: getUrl('zyucyu/meisai/delete'),
  API0321: getUrl('zyucyu/syosai'),
  API0323: getUrl('zyucyu/option'),
  API0324: getUrl('zyucyu/print'),
  API0325: getUrl('kupon'), //PUT  kupon クーポン更新
  API0328: getUrl('option'),
  API0329: getUrl('suggest/option'),
  API0330: getUrl('hioogatatuikasoryo'), //GET  非大型追加送料一括登録
  API0331: getUrl('hioogatatuikasoryo'), //PUT 非大型追加送料一括更新
  API0332: getUrl('tuikasoryo'), //POST 非大型追加送料一括更新
  API0333: getUrl('suggest/haisoarea'), //GET  配送エリアサジェスト
  API0334: getUrl('kupon/copy'), //POST kupon/copy クーポン複製
  API0335: getUrl('kupon/kuponex'), //PUT  kupon/kuponex クーポンカテゴリメーカー更新
  API0338: getUrl('catetsuide/bulk/delete'),
  API0339: getUrl('zyuhaccyukanri'), // POST 受発注登録
  API0342: getUrl('zaikokakaku/okiniiri/syohin'),
  API0343: getUrl('zaikokakaku/okiniiri/syohin'),
  API0344: getUrl('zaikokakaku/okiniiri/syohin'),
  API0345: getUrl('API0345'),
  API0346: getUrl('API0346'),
  API0347: getUrl('siharaidenpyo/siiresiharaikesikomi/delete'),
  API0348: getUrl('siharaidenpyo/haccyusiharaikesikomi/delete'),
  API0350: getUrl('henpindenpyo'),
  API0352: getUrl('henpindenpyo'),
  API0354: getUrl('variation'),
  API0356: getUrl('variation/bulk/delete'),
  API0357: getUrl('variation'),
  API0358: getUrl('syohin/outlet'),
  API0360: getUrl('syohingrptsuidegai/bulk/delete'),
  API0362: getUrl('kihonsoryo'), //GET  基本送料一覧検索
  API0363: getUrl('kihonsoryo'), //POST 基本送料一覧更新
  API0364: getUrl('sethin'),
  API0365: getUrl('sethin/bulk/delete'),
  API0366: getUrl('sethin'),
  API0367: getUrl('sethin/syohingrp'),
  API0368: getUrl('blackshiharai'),
  API0369: getUrl('blacksyouhin'),
  API0370: getUrl('blackjyogai'),
  API0372: getUrl('blackjyusyo'),
  API0373: getUrl('blacktyumonsya'),
  API0374: getUrl('blackmail'),
  API0375: getUrl('blackdenwabangou'),
  API0376: getUrl('blackshiharai/bulk/delete'),
  API0377: getUrl('blacksyouhin/bulk/delete'),
  API0378: getUrl('blackjyogai/bulk/delete'),
  API0380: getUrl('blackjyusyo/bulk/delete'),
  API0381: getUrl('blacktyumonsya/bulk/delete'),
  API0382: getUrl('blackmail/bulk/delete'),
  API0383: getUrl('blackdenwabangou/bulk/delete'),
  API0384: getUrl('suggest/oogatahaisoarea'), //GET 大型配送エリアサジェスト
  API0388: getUrl('suggest/projectxkaiin'),
  API0389: getUrl('zyucyu/syuka/oroshikyosei'),
  API0390: getUrl('suggest/haisogyo'),
  API0391: getUrl('API0391'),
  API0395: getUrl('zyucyu/meisai'), // POST 受注明細追加
  API0392: getUrl('usergroup'), // POST ユーザーグループ一括追加
  API0393: getUrl('usergroup/bulk/delete'), // POST ユーザーグループ削除
  API0397: getUrl('role'), //GET ロール一覧検索
  API0398: getUrl('grouprole'), // POST グループロール一括追加
  API0399: getUrl('grouprole/bulk/delete'), // PUT グループロール削除
  API0400: getUrl('role'), //GET ロール詳細検索 /role/{roleid}
  API0402: getUrl('role'), // POST ロール登録
  API0403: getUrl('role'), // PUT ロール更新
  API0404: getUrl('role/bulk/delete'), // POST ロール削除
  API0407: getUrl('role/roleresource'), // PUT ロールリソース一括更新
  API0410: getUrl('job'),
  API0412: getUrl('otodokesaki'),
  API0413: getUrl('otodokesaki'),
  API0414: getUrl('otodokesaki/bulk/delete'),
  API0415: getUrl('otodokesaki'),
  API0418: getUrl('jobrequest'),
  API0422: getUrl('seikyusyo'),
  API0423: getUrl('seikyusyo/issue'),
  API0426: getUrl('projectxkaiin/password'),
  API0427: getUrl('seikyusyoMeisai/register'),
  API0429: getUrl('zaikokakaku/siiremeisai'),
  API0430: getUrl('zaikokakaku/zyucyumeisai/modal'),
  API0433: getUrl('suggest/shiten'),
  API0434: getUrl('urikireSyohinShiiresaki'),
  API0436: getUrl('option/shihahoho'),
  API0438: getUrl('suggest/ginko'),
  API0439: getUrl('siire'),
  API0440: getUrl('nyukinzyucyukeshikomi'),
  API0441: getUrl('nyukinuriagekeshikomi/seikyusyo'),
  API0442: getUrl('nyukinzyucyukeshikomi/bulk/delete'),
  API0443: getUrl('uriagedenpyo'), //DELETE 売上伝票赤伝削除
  API0444: getUrl('suggest/maker'),
  API0445: getUrl('zyucyu/meisai'),
  API0446: getUrl('tyokusokanryohokoku'),
  API0447: getUrl('serviceCmplete'),
  API0448: getUrl('henpindenpyo'),
  API0449: getUrl('seikyusyoMeisai/delete'),
  API0450: getUrl('API0450'),
  API0451: getUrl('API0451'),
  API0453: getUrl('jikouza'),
  API0454: getUrl('henpindenpyo'),
  API0455: getUrl('haccyudenpyo/meisai'),
  API0456: getUrl('haccyudenpyo/meisai/bulk/delete'),
  API0457: getUrl('haccyudenpyo/meisai'),
  API0458: getUrl('siire/recreation'),
  API0461: getUrl('suggest/optiongrp'),
  API0463: getUrl('henpindenpyo/henkin'),
  API0464: getUrl('henpindenpyo/daihinsyukka'),
  API0465: getUrl('suggest/souko'),
  API0469: getUrl('catetsuide'),
  API0471: getUrl('syohingrptsuidegai'),
  API0474: getUrl('zyucyutouroku'),
  API0478: getUrl('syohingrp'),
  API0479: getUrl('maker'),
  API0480: getUrl('zyucyumeisaistatus/status'),
  API0482: getUrl('zaikohikiate/haikigenmo'),
  API0483: getUrl('zaikohikiate/zaikotyousei'),
  API0484: getUrl('suggest/amazonrate'), //GET Amazonカテゴリサジェスト
  API0485: getUrl('amazonsyohin'), //GET Amazonカテゴリ商品一覧検索
  API0486: getUrl('amazonsyohin'), //GET Amazonカテゴリ詳細検索 /amazonsyohin/{syohincd}
  API0487: getUrl('amazonsyohin'), //POST Amazonカテゴリ商品登録
  API0488: getUrl('amazonsyohin'), //PUT Amazonカテゴリ商品更新
  API0489: getUrl('amazonsyohin/bulk/delete'), //POST Amazonカテゴリ商品削除
  API0490: getUrl('nyukadenpyo'),
  API0491: getUrl('nyukadenpyo'),
  API0492: getUrl('syukadenpyo'),
  API0493: getUrl('syukadenpyo'),
  API0494: getUrl('syukadenpyo/bulk/delete'),
  API0500: getUrl('monthzaikohikiate'),
  API0501: getUrl('monthzaikohikiate/tourokunengetu'),
  API0505: getUrl('projectxpointCount'), //GET ポイント集計一覧検索
  API0506: getUrl('projectxMemberCount'), //GET projectx登録数集計一覧検索
  API0507: getUrl('eigyojisekiCount'),
  API0508: getUrl('zaikodakaCount'), //GET 在庫高集計一覧検索
  API0510: getUrl('shiharaisalesCount'), //GET 支払方法別販売集計一覧検索
  API0511: getUrl('bumonbetsusalesCount'), //GET 日別販売集計一覧検索
  API0512: getUrl('hacyujisekiCount'), //GET 発注実績集計一覧検索
  API0516: getUrl('mlsend'), //GET メール送信一覧検索
  API0517: getUrl('mlsend'), //GET  mlsend/{mlsousinno}	メール送信詳細検索
  API0518: getUrl('yubin'), // 郵便番号
  API0519: getUrl('kikankesa'), //POST 検索条件保存
  API0520: getUrl('kikankesa'), //GET 検索条件検索
  API0521: getUrl('kikankesa'), //PUT 検索条件更新
  API0522: getUrl('kikankesa/delete'), //DELETE 検索条件削除
  API0524: getUrl('jobtuti'),
  API0532: getUrl('uriagedenpyo/nebiki'), // POST 売上伝票赤伝値引登録
  API0533: getUrl('henpindenpyo/henpincancel'),
  API0535: getUrl('suggest/nounyusaki'),
  API0537: getUrl('setdepo'),
  API0540: getUrl('siharaidenpyo/akaden'),
  API0541: getUrl('seikyusyo/download'),
  API0542: getUrl('syobunsouko'),
  API0543: getUrl('zeiritsu'),
  API0545: getUrl('zyucyujistnamae'),
  API0546: getUrl('me'),
  API0547: getUrl('zyucyu/authorizationCancel'),
  API0549: getUrl('suggest/nyukinsyubetsu'),
  API0551: getUrl('sethin/reregist'),
  API0552: getUrl('zyucyu/forcedComplete'),
  API0553: getUrl('zyucyu/forcedComplete/cancel'),
  API0554: getUrl('kihonsoryo') //POST 基本送料一覧更新
}
