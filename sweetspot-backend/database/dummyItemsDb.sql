PGDMP     )    9            	    x        	   sweetspot    12.4    12.4 8    W           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            X           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            Y           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            Z           1262    18905 	   sweetspot    DATABASE     �   CREATE DATABASE sweetspot WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Hungarian_Hungary.1250' LC_CTYPE = 'Hungarian_Hungary.1250';
    DROP DATABASE sweetspot;
                postgres    false            �           1247    18946    order_delivery_enum    TYPE     R   CREATE TYPE public.order_delivery_enum AS ENUM (
    'SHIPPING',
    'PICK_UP'
);
 &   DROP TYPE public.order_delivery_enum;
       public          postgres    false            �            1259    18921 
   ingredient    TABLE     a   CREATE TABLE public.ingredient (
    id integer NOT NULL,
    name character varying NOT NULL
);
    DROP TABLE public.ingredient;
       public         heap    postgres    false            �            1259    18919    ingredient_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ingredient_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.ingredient_id_seq;
       public          postgres    false    205            [           0    0    ingredient_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.ingredient_id_seq OWNED BY public.ingredient.id;
          public          postgres    false    204            �            1259    18965    ingredient_items_item    TABLE     r   CREATE TABLE public.ingredient_items_item (
    "ingredientId" integer NOT NULL,
    "itemId" integer NOT NULL
);
 )   DROP TABLE public.ingredient_items_item;
       public         heap    postgres    false            �            1259    18934    item    TABLE     �  CREATE TABLE public.item (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    picture text NOT NULL,
    price integer NOT NULL,
    glutenfree boolean NOT NULL,
    sugarfree boolean NOT NULL,
    lactosefree boolean NOT NULL,
    "createdDate" timestamp with time zone DEFAULT now() NOT NULL,
    "updateDate" timestamp with time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.item;
       public         heap    postgres    false            �            1259    18932    item_id_seq    SEQUENCE     �   CREATE SEQUENCE public.item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.item_id_seq;
       public          postgres    false    207            \           0    0    item_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.item_id_seq OWNED BY public.item.id;
          public          postgres    false    206            �            1259    19005 
   migrations    TABLE     �   CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);
    DROP TABLE public.migrations;
       public         heap    postgres    false            �            1259    19003    migrations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.migrations_id_seq;
       public          postgres    false    213            ]           0    0    migrations_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;
          public          postgres    false    212            �            1259    18953    order    TABLE     �  CREATE TABLE public."order" (
    id integer NOT NULL,
    name text NOT NULL,
    phone text NOT NULL,
    email text NOT NULL,
    address text NOT NULL,
    "grandTotal" integer NOT NULL,
    "deliveryDate" text NOT NULL,
    delivery public.order_delivery_enum DEFAULT 'SHIPPING'::public.order_delivery_enum NOT NULL,
    notes text,
    "createdDate" timestamp with time zone DEFAULT now() NOT NULL,
    "updateDate" timestamp with time zone DEFAULT now() NOT NULL
);
    DROP TABLE public."order";
       public         heap    postgres    false    647    647            �            1259    18951    order_id_seq    SEQUENCE     �   CREATE SEQUENCE public.order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.order_id_seq;
       public          postgres    false    209            ^           0    0    order_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.order_id_seq OWNED BY public."order".id;
          public          postgres    false    208            �            1259    18972    order_items_item    TABLE     h   CREATE TABLE public.order_items_item (
    "orderId" integer NOT NULL,
    "itemId" integer NOT NULL
);
 $   DROP TABLE public.order_items_item;
       public         heap    postgres    false            �            1259    18908    user    TABLE     �   CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    salt character varying NOT NULL
);
    DROP TABLE public."user";
       public         heap    postgres    false            �            1259    18906    user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.user_id_seq;
       public          postgres    false    203            _           0    0    user_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;
          public          postgres    false    202            �
           2604    18999    ingredient id    DEFAULT     n   ALTER TABLE ONLY public.ingredient ALTER COLUMN id SET DEFAULT nextval('public.ingredient_id_seq'::regclass);
 <   ALTER TABLE public.ingredient ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    204    205            �
           2604    19000    item id    DEFAULT     b   ALTER TABLE ONLY public.item ALTER COLUMN id SET DEFAULT nextval('public.item_id_seq'::regclass);
 6   ALTER TABLE public.item ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    207    206    207            �
           2604    19008    migrations id    DEFAULT     n   ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);
 <   ALTER TABLE public.migrations ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    212    213    213            �
           2604    19001    order id    DEFAULT     f   ALTER TABLE ONLY public."order" ALTER COLUMN id SET DEFAULT nextval('public.order_id_seq'::regclass);
 9   ALTER TABLE public."order" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    209    208    209            �
           2604    19002    user id    DEFAULT     d   ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
 8   ALTER TABLE public."user" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202    203            L          0    18921 
   ingredient 
   TABLE DATA           .   COPY public.ingredient (id, name) FROM stdin;
    public          postgres    false    205   �B       Q          0    18965    ingredient_items_item 
   TABLE DATA           I   COPY public.ingredient_items_item ("ingredientId", "itemId") FROM stdin;
    public          postgres    false    210   UI       N          0    18934    item 
   TABLE DATA           �   COPY public.item (id, title, description, picture, price, glutenfree, sugarfree, lactosefree, "createdDate", "updateDate") FROM stdin;
    public          postgres    false    207   rI       T          0    19005 
   migrations 
   TABLE DATA           ;   COPY public.migrations (id, "timestamp", name) FROM stdin;
    public          postgres    false    213   �M       P          0    18953    order 
   TABLE DATA           �   COPY public."order" (id, name, phone, email, address, "grandTotal", "deliveryDate", delivery, notes, "createdDate", "updateDate") FROM stdin;
    public          postgres    false    209   �M       R          0    18972    order_items_item 
   TABLE DATA           ?   COPY public.order_items_item ("orderId", "itemId") FROM stdin;
    public          postgres    false    211   �O       J          0    18908    user 
   TABLE DATA           >   COPY public."user" (id, username, password, salt) FROM stdin;
    public          postgres    false    203   P       `           0    0    ingredient_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.ingredient_id_seq', 181, true);
          public          postgres    false    204            a           0    0    item_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.item_id_seq', 17, true);
          public          postgres    false    206            b           0    0    migrations_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.migrations_id_seq', 1, false);
          public          postgres    false    212            c           0    0    order_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.order_id_seq', 4, true);
          public          postgres    false    208            d           0    0    user_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.user_id_seq', 2, true);
          public          postgres    false    202            �
           2606    18964 $   order PK_1031171c13130102495201e3e20 
   CONSTRAINT     f   ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public."order" DROP CONSTRAINT "PK_1031171c13130102495201e3e20";
       public            postgres    false    209            �
           2606    18969 4   ingredient_items_item PK_3bc85f596d2084161e9515550d6 
   CONSTRAINT     �   ALTER TABLE ONLY public.ingredient_items_item
    ADD CONSTRAINT "PK_3bc85f596d2084161e9515550d6" PRIMARY KEY ("ingredientId", "itemId");
 `   ALTER TABLE ONLY public.ingredient_items_item DROP CONSTRAINT "PK_3bc85f596d2084161e9515550d6";
       public            postgres    false    210    210            �
           2606    18929 )   ingredient PK_6f1e945604a0b59f56a57570e98 
   CONSTRAINT     i   ALTER TABLE ONLY public.ingredient
    ADD CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY (id);
 U   ALTER TABLE ONLY public.ingredient DROP CONSTRAINT "PK_6f1e945604a0b59f56a57570e98";
       public            postgres    false    205            �
           2606    19013 )   migrations PK_8c82d7f526340ab734260ea46be 
   CONSTRAINT     i   ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);
 U   ALTER TABLE ONLY public.migrations DROP CONSTRAINT "PK_8c82d7f526340ab734260ea46be";
       public            postgres    false    213            �
           2606    18976 /   order_items_item PK_bcabdedbdb5a0a82b7ea791e407 
   CONSTRAINT     �   ALTER TABLE ONLY public.order_items_item
    ADD CONSTRAINT "PK_bcabdedbdb5a0a82b7ea791e407" PRIMARY KEY ("orderId", "itemId");
 [   ALTER TABLE ONLY public.order_items_item DROP CONSTRAINT "PK_bcabdedbdb5a0a82b7ea791e407";
       public            postgres    false    211    211            �
           2606    18916 #   user PK_cace4a159ff9f2512dd42373760 
   CONSTRAINT     e   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760";
       public            postgres    false    203            �
           2606    18944 #   item PK_d3c0c71f23e7adcf952a1d13423 
   CONSTRAINT     c   ALTER TABLE ONLY public.item
    ADD CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY (id);
 O   ALTER TABLE ONLY public.item DROP CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423";
       public            postgres    false    207            �
           2606    18918 #   user UQ_78a916df40e02a9deb1c4b75edb 
   CONSTRAINT     f   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE (username);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb";
       public            postgres    false    203            �
           2606    18931 )   ingredient UQ_b6802ac7fbd37aa71d856a95d8f 
   CONSTRAINT     f   ALTER TABLE ONLY public.ingredient
    ADD CONSTRAINT "UQ_b6802ac7fbd37aa71d856a95d8f" UNIQUE (name);
 U   ALTER TABLE ONLY public.ingredient DROP CONSTRAINT "UQ_b6802ac7fbd37aa71d856a95d8f";
       public            postgres    false    205            �
           1259    18970    IDX_5d0b70b8509eaa5ec6848688db    INDEX     l   CREATE INDEX "IDX_5d0b70b8509eaa5ec6848688db" ON public.ingredient_items_item USING btree ("ingredientId");
 4   DROP INDEX public."IDX_5d0b70b8509eaa5ec6848688db";
       public            postgres    false    210            �
           1259    18971    IDX_859d0d7265acb9c143bc70fb09    INDEX     f   CREATE INDEX "IDX_859d0d7265acb9c143bc70fb09" ON public.ingredient_items_item USING btree ("itemId");
 4   DROP INDEX public."IDX_859d0d7265acb9c143bc70fb09";
       public            postgres    false    210            �
           1259    18977    IDX_98444c0ad52b9e6e2b1f8f1a7d    INDEX     b   CREATE INDEX "IDX_98444c0ad52b9e6e2b1f8f1a7d" ON public.order_items_item USING btree ("orderId");
 4   DROP INDEX public."IDX_98444c0ad52b9e6e2b1f8f1a7d";
       public            postgres    false    211            �
           1259    18978    IDX_beae103ca77096a308d911bc0b    INDEX     a   CREATE INDEX "IDX_beae103ca77096a308d911bc0b" ON public.order_items_item USING btree ("itemId");
 4   DROP INDEX public."IDX_beae103ca77096a308d911bc0b";
       public            postgres    false    211            �
           2606    18979 4   ingredient_items_item FK_5d0b70b8509eaa5ec6848688dbc    FK CONSTRAINT     �   ALTER TABLE ONLY public.ingredient_items_item
    ADD CONSTRAINT "FK_5d0b70b8509eaa5ec6848688dbc" FOREIGN KEY ("ingredientId") REFERENCES public.ingredient(id) ON DELETE CASCADE;
 `   ALTER TABLE ONLY public.ingredient_items_item DROP CONSTRAINT "FK_5d0b70b8509eaa5ec6848688dbc";
       public          postgres    false    210    2742    205            �
           2606    18984 4   ingredient_items_item FK_859d0d7265acb9c143bc70fb094    FK CONSTRAINT     �   ALTER TABLE ONLY public.ingredient_items_item
    ADD CONSTRAINT "FK_859d0d7265acb9c143bc70fb094" FOREIGN KEY ("itemId") REFERENCES public.item(id) ON DELETE CASCADE;
 `   ALTER TABLE ONLY public.ingredient_items_item DROP CONSTRAINT "FK_859d0d7265acb9c143bc70fb094";
       public          postgres    false    207    210    2746            �
           2606    18989 /   order_items_item FK_98444c0ad52b9e6e2b1f8f1a7df    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_items_item
    ADD CONSTRAINT "FK_98444c0ad52b9e6e2b1f8f1a7df" FOREIGN KEY ("orderId") REFERENCES public."order"(id) ON DELETE CASCADE;
 [   ALTER TABLE ONLY public.order_items_item DROP CONSTRAINT "FK_98444c0ad52b9e6e2b1f8f1a7df";
       public          postgres    false    211    2748    209            �
           2606    18994 /   order_items_item FK_beae103ca77096a308d911bc0b8    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_items_item
    ADD CONSTRAINT "FK_beae103ca77096a308d911bc0b8" FOREIGN KEY ("itemId") REFERENCES public.item(id) ON DELETE CASCADE;
 [   ALTER TABLE ONLY public.order_items_item DROP CONSTRAINT "FK_beae103ca77096a308d911bc0b8";
       public          postgres    false    211    2746    207            L   �  x�]VK�����(����f$@�/Y@&�M˴�H�y�.z�Ѓ4
�A�� !j=�B)�]���KR��s�ɿ�������[A�C+�Ǟiռ~24%�NB��q�f�4[u;)}4_�3�ݳ]?X��Г��ʑ��:w����V��6Z6gw5�G��	������0��tG�c��wn��ɬ��qך���l��;����Z�|&#�e;�GyN�%Z�3٪��-��"1#�$��ݎ�\-���gG�����/�v7��5�S4N�|o��B��3�����H���7j��oh\C���a�0и|k���v׭�qE���O|��I}�5ҝp�0��d䅍R���I�ެ���4Mʒ���v�nN��Uc1��(>�$#� ��Ol�4�mZ���8��hR9�k�𿛬liR�R�M__ܓe�}iݳ�Z���4�2�Fd#�������1>>�	����H��vt7�������*���ݺ�{�Τ�_�5z&��^���؏H���M�wF;�~��X	�/;M�E�����E�Ѹ/;�q���{�d/�Pك��,����l���w�d�:����4���ة6d� ����U��:YIj�m��i�$���"u����p2#�#R�N��&��яBќ�,�7'�M14�����^���_��������f��O� �QQ�ǎ�99�Z�n���vDuv�ǉq^~c	۪���Ũ:ZD��n��E��׏1�n�M?�����E�l����7�D��.22ߊ�neC���+shQ�F6v2���j	C����}'-��x�*Ҩ��e��O��N�e�-�j����f�6$��ɪM!���Zf�#[��~wk�8$�Q���!�p�j+޵zY�Z�0ΒVѬ������٪�|�UB ��R�Hk�U��:Z�dI��Z���qUz�F�V$�U� A�[���$����6n��ɷ;�e������D'�(��nx�d7�H�#��n�<�6B{4d�fl������*-���'����ţꮰ��:4(�VD� #'Ov۟Ů�H1��,~
 �AE��2s��"K%`�eE�[� �h1-���K�l�P2��	��\�#�]N~5�_z���^?�[3�BO� ��4�֪!�M�Zog�~H����*�k�-�l+��M�	ز^S�;LrP��TspՀvG�#;�]}5-=+'�i��ڏ<a����K�Q�V�S؟�8�G\v(ع�98ɜ�yf98	�S�o��(����2����g��'����{���@J�6z��`$ �uM���g��"I�A�?�y��;�/���C�@\�.sH�'��/�n��	��b�V�1 � �r�?�������)ϧ;����l�����Fq�K�=,�	�y[���R��lT�g+ȹ�CN�R�P?Q�(U��䏍���7�de�_?�7�����09�=~D4�B�`VP�,��n`�����1Yę���t1�>pW?� 1_��90�"�s�ݗ�`���Q-��;�r�j���G/��nU����%M-����A�F^ gd�b9�	$ؿ�j��TEI���@�S ?) � ����C-o�pA��R�i+��      Q      x������ � �      N   5  x��V�n�6����;�v,K�n�=�A��c���h�E
$��z�<�G� 
oDޫe�N|Z��"E�2I?���[�T3�-�s��?JGK,�a�e��a1�7�Pi�l��=���Q�_�ڽ�١��C�m��x��d)��6�8��$i��ƿ`"Ϸ��J�q���+�6��E+���ݝ�&WںY�ם}���Z����޺.�A�ߏ�K�9�w|RJ�Y�̆��$���1�?G�$���
Q�������r�m�v���I��~��Ɖrc�K^0���� �Ip�� ��%&K&uU�=�M��}c�T�X���8(GSrZ��[�=9��z��З��7�%i�?���藣q2�~�y���+�ѕ�䴁�K�mZX]j��y`a��v�l�l�����5���g@tAa�,�<�ek�%qw�@�������ڇ��V�ؘ<���|�/[���ϲ�7�N���
���8G��(v�d&gU�����7� �ϙ����?��ws.m(V:�b�@�: ��A^!%sX�L���C������p�'�OZ�W�����d2�+p/G�$��ڝ�}\	[�]�"�/���U\Jd��s��� <��p#��r0~�	R��vڔ]A[n�N�x�v��z�_Ú�O���Yo�}JW?�?��~x���ae�d�]A9O�tH�EUY�Fkv�₁����%ڈBumy�ab��
�g|aLKPC�F��ߞ�H�5�K�B~��H��A�4���`������?��C��g�+�f���»��At���_jäP!��J���dܩ�e˱e�$�ծC+�v�P�#�+\Qp�
��u!
y��⟣@�[j>kQ�ó�?��'�&٤��h����N�y�#��3��ǉ+���P�D�Py��B_a�9�0S�(vhDx��	��3��z۱6<u�wU�fiO���
���8F�[һ�YlKݠt�T�	~���K^B�2�~�GvI{�R��0�J�0�[j|ݣ{����uE��Xa�,C�ؔU�����*8���S���=
�`������r4�����
;      T      x������ � �      P   �  x�}��n�0�g�)���D�t�ۦ��0�CP��dFUE��H���"���C�nE7!�U&��q
\�ù�<ϥ��|���Q��i(x�2���!-m�M"u^9:��^g��5NM�Xg2-���֪Ǻ��K%!�+�|3���a$�$����!!�0!�
MOǓ���	:m-��
����n�S��Vצ2��ʁFCJ�L�A̙�GO�T��d���,��qz�;����'��\k��DD����}������OtޮjU��n`���2�M���An�TZ��������IL�5E�#��1f�� qW8�T�q>U<I��{��!�S)g��<1.O�N� ��L䬐xw���B�6���-�� ��FC�p$�;���:1e��NaT��O�������N�,�3�\�r����<b�-㽵'_�%���+�k3k����g����)W�r&3hW3em�ʔ�{�L9��H<��=5��� �����      R   7   x�ɱ  �99������x��)h�ŀ�)&�,Hf�0��w�zl�F��
S      J   �   x�}ͻ�0 @љ~��ZG�!�4�ƥ�Hi�#�J��uЕ��\h)�O��VU�,1:v)�V�J����c�&
��q��nX0�Q�9��|�Ɨ[�v���ߊ������kFN���������*M��p��]'���2p#Z�w|�«�l�� �΋E     